import {vcmRules} from '../functions/vcm_rules.js'
import {extraRules} from '../functions/extra_rules.js'
import {requiredCrewNumber} from '../functions/required_crew_number.js'
import {positions} from '../data/positions.js';
import {errorHandler} from '../functions/error_handler.js'
import {fleet} from '../data/fleet.js';


export function loadPositions(crewData, registration, isULR) {
    if (isULR && crewData.filter((crew) => crew.grade == "CSV").length < 3) isULR = false; // Check for LR flights or other flights with breaks, but non-ULR (2 CSV)
    let grades = ["PUR", "CSV", "FG1", "GR1", "GR2", "CSA"]
    let thisFlightPositions = JSON.parse(JSON.stringify(
                              [11, 9, 8].includes(fleet[registration]) && isULR /* Check if it is A380 ULR */ ? positions[99] :
                              [1, 2, 3, 6].includes(fleet[registration]) && isULR /* Check if it is B773 3 class ULR */ ? positions[98] : 
                              [12].includes(fleet[registration]) && isULR /* Check if it is B773 4 class ULR */ ? positions[97] : 
                              positions[fleet[registration]]
                              ));

    // Temp rule: B773 4th Gr1 added in stages 2024
    if([1, 2, 3, 6, 12, 97, 98].includes(fleet[registration]) && crewData.filter((crew) => crew.grade == "GR1").length  === 4){
      let n = thisFlightPositions.EXTRA.indexOf("R5C")
      thisFlightPositions.EXTRA.slice(n, n+1)
      thisFlightPositions.GR1.remain.push("R5C")
    }
    // End of temp rule

    let requiredCrew = requiredCrewNumber (fleet[registration]);
    let vcm = crewData.length - requiredCrew;
    //Check VCM by grades
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
    return thisFlightPositions;
  }