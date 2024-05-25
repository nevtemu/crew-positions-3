export function addAircraftRegistrationManually (n) {
    let registration = document.querySelector(`#registrInput${n}`).value.toUpperCase();
    if (fleet.hasOwnProperty(registration)) {
        dataPool[Object.keys(dataPool)[n]].flightData.FlightData[0].AircraftTail = registration;
        document.querySelector("#cardContainer").innerHTML = "";
        createTrips(dataPool);
    } else {
        errorHandler(`Registration you entered ${registration} is not found`,"error");
    }
}