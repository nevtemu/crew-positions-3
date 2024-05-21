import {settings} from './settings.js';

// Data
import {fleet} from './data/fleet.js';
import {positions} from './data/positions.js';

// Functions
import {additional_info} from './functions/additional_info.js'
import {birthday_check} from './functions/birthday_check.js'
import {W_selector} from './functions/W_selector.js'
import {loadCrew} from './functions/load_crew.js'
import {loadPositions} from './functions/load_positions.js'
import {generatePositions} from './functions/generate_positions.js'
import {createTrips} from './functions/create_trips.js'
import {errorHandler} from './functions/error_handler.js'
import {renderer} from './functions/renderer.js'
import {createOutput} from './functions/create_output.js'

let dataPool; // To store data from portal

// Connection
window.onload = function () {
  if (window.opener !== null) {
    renderer([document.querySelector("#fetchTable")]);
    window.opener.postMessage("Ready to receive", "*");
    console.warn("Request for data sent to portal");
  }
};

window.addEventListener("message", (receivedData) => {
  dataPool = receivedData.data;
  console.warn("Data received from portal");
  console.log(dataPool);
  renderer([document.querySelector("#tripsTable")],[document.querySelector("#fetchTable")]);
  createTrips(dataPool);
  window.opener.postMessage("Thank you", "*");
});

// Crew table
export function start(event, n, doPositions) {
  renderer([document.querySelector("#crewTable"), document.querySelector("#flightInfo"), document.querySelector("#keyBind")],[document.querySelector("#tripsTable"),document.querySelector("#errorTable"),],true);
  let flights = Object.keys(dataPool);
  let specificFlightData = dataPool[flights[n]];
  let crewData = loadCrew(specificFlightData.crewData);
  console.warn("Crew data loaded successfully");

  birthday_check(crewData, specificFlightData);

  let registration = specificFlightData.flightData.FlightData[0].AircraftTail;
  let numberOfDuties = document.querySelector(`#sectors${n}`).value; //These values taken from page as user may change number of positions/breaks desired
  let hasBreak = document.querySelector(`#rest${n}`).checked;

//Upgrades and DF targets output
if (settings['additional_info']){
  const dfTag = document.querySelector("#dfOutput");
  const upgTag = document.querySelector("#upgOutput");
  const stationTag = document.querySelector("#stationInfoOutput");
  const ramadanTag = document.querySelector("#ramadanOutput");
  
  const extra_info = additional_info(specificFlightData.shortInfo);
  
  dfTag.innerHTML = extra_info.targetsDF;
  upgTag.innerHTML = extra_info.upgrades;
  stationTag.innerHTML = extra_info.stationInfo;
  if(settings.ramadan){
    ramadanTag.innerHTML = extra_info.ramadan;
  }
}

if (fleet[registration] == 10){
  W_selector(crewData, positions);
}

  //Temporarily A380 grade change for USA ULR trips // TEMP !!!
  if (["JFK", "BOS", "IAD", "IAH", "DFW", "ORD", "MIA", "SEA", "SFO", "LAX", "MCO"].includes(specificFlightData.flightData.FlightData[0].Destination) && specificFlightData.flightData.FlightData[0].AircraftType == "A380-800" && 
  crewData.filter((crew) => crew.grade == "GR2").length < 8 && crewData.filter((crew) => crew.grade == "GR1").length > 8){
    businessClassCrew = crewData.filter((crew) => crew.grade == "GR1")
    for (let i=0; i < 2; i++){
      businessClassCrew[businessClassCrew.length-i-1].grade = "GR2";
      businessClassCrew[businessClassCrew.length-i-1].timeInGradeNumber = 0;
      errorHandler(`${businessClassCrew[businessClassCrew.length-i-1].nickname} moved to Gr2`, "info");
    }
  }
  //End of USA grade change

  localStorage.setItem("crewData", JSON.stringify(crewData));
  let thisTripPositions = []
  if (doPositions) { // Runs only if generating positions (does not run for "List only" option)
    thisTripPositions = loadPositions(crewData, registration, hasBreak);
    console.warn("Positions loaded successfully");
    generatePositions(crewData, thisTripPositions, registration, numberOfDuties, hasBreak);
  } 
  localStorage.setItem("thisTripPositions", JSON.stringify(thisTripPositions));
  localStorage.setItem("registration", registration);
  localStorage.setItem("numberOfDuties", numberOfDuties);
  localStorage.setItem("hasBreak", hasBreak);
  localStorage.setItem("doPositions", doPositions);
  createOutput(crewData, numberOfDuties, hasBreak, doPositions);
}

export function restart(event) {
  renderer([], [], true);
  let crewData = JSON.parse(localStorage.getItem("crewData"));
  let thisTripPositions = JSON.parse(localStorage.getItem("thisTripPositions"));
  let registration = localStorage.getItem("registration");
  let numberOfDuties = parseInt(localStorage.getItem("numberOfDuties"));
  let hasBreak = /true/i.test(localStorage.getItem("hasBreak"));
  let doPositions = /true/i.test(localStorage.getItem("doPositions"));
  if (doPositions) generatePositions(crewData, thisTripPositions, registration, numberOfDuties, hasBreak);
  createOutput(crewData, numberOfDuties, hasBreak, doPositions);
}

document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.shiftKey && event.code === "KeyH") {
    if (document.querySelector("#crewTable").classList.contains("hidden")) {
      document.querySelector("#errorTable").classList.toggle("hidden");
      return;
    }
    if (document.querySelector("#errorTable").classList.contains("hidden") && !document.querySelector("#crewControls").classList.contains("hidden")) {
      document.querySelector("#errorTable").classList.remove("hidden");
      return;
    }
    if (!document.querySelector("#errorTable").classList.contains("hidden")) {
      document.querySelectorAll(".UIhood").forEach((element) => element.classList.add("hidden"));
      return;
    }
    document.querySelectorAll(".UIhood").forEach((element) => element.classList.remove("hidden"));
  }
});

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

export function addMFP (event){
  const tagMFP = ` <span class="badge badge-mfp" title="MFP">MFP</span>`;
  const location = event.target.parentElement;
  location.innerHTML += tagMFP;
}