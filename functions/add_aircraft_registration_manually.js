import {fleet} from '../data/fleet.js';
import {createTrips} from './create_trips.js'
import {errorHandler} from './error_handler.js'

export function addAircraftRegistrationManually (n) {
    let registration = document.querySelector(`#registrInput${n}`).value.toUpperCase();
    if (fleet.hasOwnProperty(registration)) {
        console.log(dataPool[Object.keys(dataPool)[n]])
        dataPool[Object.keys(dataPool)[n]].hasOwnProperty("flightData") && dataPool[Object.keys(dataPool)[n]].flightData.hasOwnProperty("FlightData") && dataPool[Object.keys(dataPool)[n]].flightData.FlightData ?
        dataPool[Object.keys(dataPool)[n]].flightData.FlightData[0].AircraftTail = registration :
        dataPool[Object.keys(dataPool)[n]].flightData = {"FlightData":[{"AircraftTail": registration}]};
        document.querySelector("#cardContainer").innerHTML = "";
        createTrips();
    } else {
        errorHandler(`Registration you entered ${registration} is not found`,"error");
    }
}