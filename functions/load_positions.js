import {vcmRules} from '../functions/vcm_rules.js'
import {extraRules} from '../functions/extra_rules.js'
import {requiredCrewNumber} from '../functions/required_crew_number.js'
import {positions} from '../data/positions.js';
import {errorHandler} from '../functions/error_handler.js'
import {fleet} from '../data/fleet.js';


export function loadPositions(crewData, registration, isULR) {
    if (isULR && crewData.filter((crew) => crew.grade == "CSV").length < 3) isULR = false; // Check for LR flights or other flights with breaks, but non-ULR (2 CSV)
    let thisFlightPositions = JSON.parse(JSON.stringify(
                              [12, 11, 9, 8].includes(fleet[registration]) && isULR /* Check if it is A380 ULR */ ? positions[99] :
                              [1, 2, 3, 6].includes(fleet[registration]) && isULR /* Check if it is B773 ULR */ ? positions[98] : 
                              positions[fleet[registration]]
                              ));
    let requiredCrew = requiredCrewNumber (fleet[registration]);
    let vcm = crewData.length - requiredCrew;
    //Check VCM by grades
    let variations = {};
    Object.keys(thisFlightPositions).forEach((grade) => {
      if (grade !== "EXTRA") {
        let thisFlightPositionsByGrade = [];
        Object.keys(thisFlightPositions[grade]).forEach((item) => thisFlightPositionsByGrade = [...thisFlightPositionsByGrade, ...thisFlightPositions[grade][item]]);
        let difference = crewData.filter((crew) => crew.grade === grade).length - thisFlightPositionsByGrade.length;
        if (difference !== 0) variations[grade] = difference;
      }
    });
    //End of VCM check by grades
    if (Object.keys(variations).length !== 0) {
      errorHandler(`VCM ${vcm}. Crew differences by grades: ${JSON.stringify(variations).replaceAll(/["{}]/gm, "")}`, "error");
      thisFlightPositions = vcm < 0 ? vcmRules(vcm, thisFlightPositions, fleet[registration], isULR) : extraRules(thisFlightPositions, variations);
    }
    return thisFlightPositions;
  }