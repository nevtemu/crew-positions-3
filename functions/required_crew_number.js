import {positions} from '../data/positions.js';
import {fleet} from '../data/fleet.js';
import { loadPositions } from './load_positions.js';

export function requiredCrewNumber(crewData, registration, isULR) {
// export function requiredCrewNumber(typesOfAircraft) {
//     let thisFlightPositions = positions[typesOfAircraft];
    let thisFlightPositions = loadPositions(crewData, registration, isULR);
   
    let positionsList = [];
    Object.keys(thisFlightPositions).forEach((grade) => {
        if (grade !== "EXTRA") {
            Object.keys(thisFlightPositions[grade]).forEach((item) => positionsList = [...positionsList, ...thisFlightPositions[grade][item]]);
        }
    });
    return positionsList.length;
}