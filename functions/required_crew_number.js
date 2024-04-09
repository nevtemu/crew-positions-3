import {positions} from '../data/positions.js';

export function requiredCrewNumber(typesOfAircraft) {
    let thisFlightPositions = positions[typesOfAircraft];
    let positionsList = [];
    Object.keys(thisFlightPositions).forEach((grade) => {
        if (grade !== "EXTRA") {
            Object.keys(thisFlightPositions[grade]).forEach((item) => positionsList = [...positionsList, ...thisFlightPositions[grade][item]]);
        }
    });
    return positionsList.length;
}