import {renderer} from './renderer.js'
import {generatePositions} from './generate_positions.js'
import {createOutput} from './create_output.js'

export function restart(event) {
    renderer([], [], true);
    let crewData = JSON.parse(localStorage.getItem("crewData"));
    let thisTripPositions = JSON.parse(localStorage.getItem("thisTripPositions"));
    let registration = localStorage.getItem("registration");
    let numberOfDuties = parseInt(localStorage.getItem("numberOfDuties"));
    let hasBreak = localStorage.getItem("hasBreak").split(",").map(item => JSON.parse(item))
    let doPositions = /true/i.test(localStorage.getItem("doPositions"));
    if (doPositions) generatePositions(crewData, thisTripPositions, registration, numberOfDuties, hasBreak);
    createOutput(crewData, numberOfDuties, hasBreak, doPositions);
}