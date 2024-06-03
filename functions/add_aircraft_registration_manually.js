import {fleet} from '../data/fleet.js';
import {createTrips} from './create_trips.js'
import {errorHandler} from './error_handler.js'

export function addAircraftRegistrationManually (n, data) {
    let registration = document.querySelector(`#registrInput${n}`).value.toUpperCase();
    if (fleet.hasOwnProperty(registration)) {
        data[Object.keys(data)[n]].flightData.FlightData[0].AircraftTail = registration;
        document.querySelector("#cardContainer").innerHTML = "";
        createTrips(data);
    } else {
        errorHandler(`Registration you entered ${registration} is not found`,"error");
    }
}