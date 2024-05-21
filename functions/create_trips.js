import {fleetAge} from '../data/fleet_age.js';
import {typesOfAircraft} from '../data/aircraft_type.js';
import {fleet} from '../data/fleet.js';

import {requiredCrewNumber} from '../functions/required_crew_number.js'
import {errorHandler} from '../functions/error_handler.js'
import {renderer, showRegistrationInputField} from '../functions/renderer.js'


export function createTrips(data) {
    Object.keys(data).forEach((item, index) => {
        let output = `<tr id="row${index}">`;
        let flightNumber = data[item].shortInfo.flightNumber;
        let flightLegs = data[item].shortInfo.flightLegs.join("-");
        let sectors = data[item].shortInfo.sectors;
        let hasRest = data[item].shortInfo.longest >= 9.5 ? true : false;
        let flightDate = data[item].shortInfo.flightDate.toLocaleDateString("en-GB");
        let registration, description, crc, typeOfOperation, age;
        registration = description = crc = typeOfOperation = age = "";
        let hasRegistration = "flightData" in data[item] && data[item].flightData.FlightData[0].AircraftTail != null; //For reserve trips and trips that were long time ago portal returns null for aircraft registration (AircraftTail)
        if ("flightData" in data[item] && !hasRegistration) errorHandler(`Flight ${flightNumber} on ${flightDate} missing data from portal`, "error");
        if (hasRegistration) {
            registration = data[item].flightData.FlightData[0].AircraftTail;
            if (registration in fleet) {
                description = typesOfAircraft[fleet[registration]].description;
                crc = typesOfAircraft[fleet[registration]].crc;
                age = fleetAge[registration]
            } else {
                errorHandler(`Registration ${registration} for flight number ${flightNumber} not found`, "error");
                hasRegistration = false;
            }

            typeOfOperation = data[item].flightData.FlightData[0].ServiceType;
        }
        output += `<td id="flightNumber${index}">EK${flightNumber}</td>`;
        output += `<td id="flightDate${index}">${flightDate}</td>`;
        output += `<td id="flightLegs${index}">${flightLegs}</td>`;
        output += `<td><input type="number" id="sectors${index}" value=${sectors} min="1" max="9" maxlength="1"/></td>`;
        output += `<td><input type="checkbox" id="rest${index}" ${hasRest ? "checked" : ""}/></td>`;
        output += `<td id="aircraftRegistration${index}">${registration === "NA" ? "" : registration}</td>`;
        output += `<td id="aircraftDescription${index}">${description}</td>`;
        output += `<td id="aircraftAge${index}">${age.slice(-4)}</td>`;
        output += `<td id="crc${index}">${crc != "" ? crc == 1 ? "Yes" : crc == 2 ? "LD" : crc == 3 ? "MD" : "No" : ""}</td>`;
        let crewNumber, vcm;
        crewNumber = vcm = "";
        if ("crewData" in data[item] && hasRegistration) {
            crewNumber = data[item].crewData.length;
            vcm = requiredCrewNumber(fleet[registration]);
        }
        let vcm_output = vcm - crewNumber === 0 ? "" : (vcm - crewNumber) * -1 < 0 ? (vcm - crewNumber) * -1 : "+" + (vcm - crewNumber) * -1;
        output += `<td id="VCM${index}" style=${crewNumber - vcm < 0 ? "color:red" : crewNumber - vcm > 0 ? "color:darkgreen" : ""}>${vcm_output}</td>`;
        output += `<td id="crewNumber${index}">${vcm !== "" ? crewNumber + "/" + vcm : ""}</td>`;
        output += "crewData" in data[item] ? hasRegistration /* Could have another check here for type of operation `&& typeOfOperation === "Passenger flight"` but information from portal was inconsistent */ ?
            `<td style="border:none;background:white;"><button id="buttonList${index}" onclick="start(event, ${index}, ${false})">List only</button><button id="buttonGenerate${index}" onclick="start(event, ${index}, ${true})">Generate</button></td>` /* Renders if all data is available */ :
            `<td style="border:none;background:white;""><button id="buttonList${index}" onclick="start(event, ${index}, ${false})">List only</button><button id="buttonRegistration${index}" onclick="showRegistrationInputField(event, ${index})">Add registration</button><span id="registrField${index}" class="hidden"><input id="registrInput${index}" type=text value="A6E" maxlength="5" size="5" onkeypress="return /[0-9a-zA-Z]/i.test(event.key)" style="text-transform:uppercase"/><button id="buttonOK${index}" onclick="addAircraftRegistrationManually(${index})">OK</button></span></td>` /* Renders if only crew data is available */ :
            "";
        output += `</tr>`;
        document.querySelector("#cardContainer").innerHTML += output;
    });
    renderer([document.querySelector("#tripsTable")], [document.querySelector("#fetchTable")]);
}