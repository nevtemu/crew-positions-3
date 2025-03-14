import {vcmRules} from '../functions/vcm_rules.js'
import {extraRules} from '../functions/extra_rules.js'
import {requiredCrewNumber} from '../functions/required_crew_number.js'
import {positions} from '../data/positions.js';
import {errorHandler} from '../functions/error_handler.js'
import {fleet} from '../data/fleet.js';
import {breaks} from '../data/breaks.js';

export function loadPositions(crewData, registration, isULR, forTripsTable = true) {
    //crewData can come in 2 different formats (grade could be under "grade" or "OperationGrade")
  let operationType = [11, 9, 8].includes(fleet[registration]) && isULR && crewData.filter((crew) => crew.grade === "CSV" || crew.OperationGrade == 'CSV').length < 3 /* For LR (nonULR) A380 with breaks but with 2 CSVs only */ ? fleet[registration] :
                        [11, 9, 8].includes(fleet[registration]) && isULR /* Check if it is A380 ULR */ ? 908 :
                        [11, 9, 8].includes(fleet[registration]) && !isULR && crewData.filter((crew) => crew.grade === "CSV" || crew.OperationGrade == 'CSV').length > 2 && crewData.filter((crew) => crew.grade === "GR2").length < 9 /* Check if it is A380 non-ULR but with 3 CSV */ ? 908 :
                        [1, 2, 3, 6].includes(fleet[registration]) && isULR && crewData.filter((crew) => crew.grade === "FG1" || crew.OperationGrade == 'FG1').length > 2 /* Check if it is B773 3 class ULR */ ? 901 : 
                        [12, 16].includes(fleet[registration]) && crewData.filter((crew) => crew.grade === "FG1" || crew.OperationGrade == 'FG1').length > 2 && isULR /* Check if it is B773 4 class ULR */ ? 912 : 
                        [4].includes(fleet[registration]) && isULR /* Check if it is B772 2 class ULR */ ? 904 : 
                        fleet[registration]

  let thisFlightPositions = structuredClone(positions[operationType]);
  const thisFlightBreaks = structuredClone(breaks[operationType])

    // Temp rule: B773 4th Gr1 added in stages 2024
    if([1, 2, 3, 6, 12, 16, 912, 901].includes(operationType) && crewData.filter((crew) => crew.grade == "GR1" || crew.OperationGrade == 'GR1').length  === 4){
      let n = thisFlightPositions.EXTRA.only.indexOf("R5C")
      if (n) thisFlightPositions.EXTRA.only.slice(n, n+1)
      thisFlightPositions.GR1.remain.push("R5C")
    }
    // End of temp rule

    // Temp rule: B773 3rd Fg1 added for full turnarounds 2024
    if([1, 2, 3, 6, 12, 16].includes(operationType) && crewData.filter((crew) => crew.grade == "FG1" || crew.OperationGrade == 'FG1').length  === 3){
      let n = thisFlightPositions.EXTRA.only.indexOf("L1A")
      if (n) thisFlightPositions.EXTRA.only.slice(n, n+1)
      thisFlightPositions.FG1.remain.push("L1A")
    }
    //End of temp rule

    if (forTripsTable) return thisFlightPositions

    // let requiredCrew = requiredCrewNumber (fleet[registration]);
    let requiredCrew = requiredCrewNumber (crewData, registration, isULR);
    let vcm = crewData.length - requiredCrew;
    //Check VCM by grades
    let grades = ["PUR", "CSV", "FG1", "GR1", "GR2", "CSA"]
    let variations = {};
    grades.forEach((grade) => {
        let thisFlightPositionsByGrade = [];
        if (thisFlightPositions.hasOwnProperty(grade)){
          Object.keys(thisFlightPositions[grade]).forEach((item) => thisFlightPositionsByGrade = [...thisFlightPositionsByGrade, ...thisFlightPositions[grade][item]]);
        }
        let difference = crewData.filter((crew) => crew.grade === grade).length - thisFlightPositionsByGrade.length;
        if (difference !== 0) variations[grade] = difference;
    });
    //End of VCM check by grades
    if (Object.keys(variations).length !== 0) {
      errorHandler(`VCM ${vcm}. Crew differences by grades: ${JSON.stringify(variations).replaceAll(/["{}]/gm, "")}. Use "Show positions" to adjust positions manually`, "error");
      thisFlightPositions = vcm < 0 ? vcmRules(vcm, thisFlightPositions, fleet[registration], isULR) : extraRules(thisFlightPositions, variations);
    }
    return {thisFlightPositions, thisFlightBreaks};
  }