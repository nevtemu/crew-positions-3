import {vcmRules} from '../functions/vcm_rules.js'
import {extraRules} from '../functions/extra_rules.js'
import {requiredCrewNumber} from '../functions/required_crew_number.js'
import {positions} from '../data/positions.js';
import {errorHandler} from '../functions/error_handler.js'
import {fleet} from '../data/fleet.js';
import {breaks} from '../data/breaks.js';

export function loadPositions(crewData, registration, isULR, forTripsTable = true) {
    let operationType = [11, 9, 8].includes(fleet[registration]) && isULR && crewData.filter((crew) => crew.grade === "CSV").length < 3 /* For LR (nonULR) A380 with breaks but with 2 CSVs only */ ? fleet[registration] :
                        [11, 9, 8].includes(fleet[registration]) && isULR /* Check if it is A380 ULR */ ? 908 :
                        [1, 2, 3, 6].includes(fleet[registration]) && isULR && crewData.filter((crew) => crew.grade === "FG1").length > 2 /* Check if it is B773 3 class ULR */ ? 901 : 
                        [12].includes(fleet[registration]) && isULR /* Check if it is B773 4 class ULR */ ? 912 : 
                        [4].includes(fleet[registration]) && isULR /* Check if it is B772 2 class ULR */ ? 904 : 
                        fleet[registration]

  let thisFlightPositions = structuredClone(positions[operationType]);
  const thisFlightBreaks = structuredClone(breaks[operationType])

    // Temp rule: B773 4th Gr1 added in stages 2024
    if([1, 2, 3, 6, 12, 912, 901].includes(operationType) && crewData.filter((crew) => crew.grade == "GR1").length  === 4){
      let n = thisFlightPositions.EXTRA.indexOf("R5C")
      if (n) thisFlightPositions.EXTRA.slice(n, n+1)
      thisFlightPositions.GR1.remain.push("R5C")
    }
    // End of temp rule

    // Temp rule: B773 3rd Fg1 added for full turnarounds
    if([1, 2, 3, 6, 12].includes(operationType) && crewData.filter((crew) => crew.grade == "FG1").length  === 3){
      let n = thisFlightPositions.EXTRA.indexOf("L1A")
      if (n) thisFlightPositions.EXTRA.slice(n, n+1)
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
      errorHandler(`VCM ${vcm}. Crew differences by grades: ${JSON.stringify(variations).replaceAll(/["{}]/gm, "")}`, "error");
      thisFlightPositions = vcm < 0 ? vcmRules(vcm, thisFlightPositions, fleet[registration], isULR) : extraRules(thisFlightPositions, variations);
    }
    return {thisFlightPositions, thisFlightBreaks};
  }