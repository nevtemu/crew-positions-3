import {defaultSettings} from './default_settings.js';

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
import {renderer, hideGUI} from './functions/renderer.js'
import {createOutput} from './functions/create_output.js'
import {createSettings} from './functions/create_settings.js'
import {filterLanguages, languagesCount} from './functions/languages.js'

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
  window.dataPool = dataPool; // Global variable required for some functions (add registration manually etc.)
  console.warn("Data received from portal");
  console.log(dataPool);

  //Settings
  let settings;
  if (document.cookie && document.cookie.match(/^(?=.*\S).*settings=.*/)) {
    settings = JSON.parse(document.cookie.split("; ").find((part) => part.startsWith("settings="))?.split("=")[1])
    if (Object.keys(settings).length !== Object.keys(defaultSettings).length || Object.keys(settings).join("") !== Object.keys(defaultSettings).join("") ) settings = defaultSettings 
  }
  else settings = defaultSettings;
  localStorage.setItem("settings", JSON.stringify(settings));
  createSettings(settings);

  renderer([document.querySelector("#tripsTable")],[document.querySelector("#fetchTable")]);
  createTrips();
  window.opener.postMessage("Thank you", "*");
});

// Crew table
export function start(event, n, doPositions) {
  renderer([document.querySelector("#crewTable"), document.querySelector("#flightInfo"), document.querySelector("#keyBind")],[document.querySelector("#tripsTable"),document.querySelector("#errorTable"),document.querySelector("#settings-wrapper")],true);
  let flights = Object.keys(dataPool);
  let specificFlightData = dataPool[flights[n]];
  let crewData = loadCrew(specificFlightData.crewData);
  let isULR = Math.max(...specificFlightData.shortInfo.durations) > 9.5
  console.warn("Crew data loaded successfully");

  birthday_check(crewData, specificFlightData);

  let registration = specificFlightData.flightData.FlightData[0].AircraftTail;
  let numberOfDuties = document.querySelector(`#sectors${n}`).value; //These values taken from page as user may change number of positions/breaks desired
  
  let hasBreak = []
  let breakNodes = document.querySelector(`#rest${n}`).childNodes;
  breakNodes.forEach(node => hasBreak.push(node.checked))

  let settings = JSON.parse(localStorage.getItem("settings"))
//Upgrades and DF targets output
const dfTag = document.querySelector("#dfOutput");
const upgTag = document.querySelector("#upgOutput");
const stationTag = document.querySelector("#stationInfoOutput");
const langTag = document.querySelector("#langOutput");
const ramadanTag = document.querySelector("#ramadanOutput");
if (settings.additional_info){
  const extra_info = additional_info(specificFlightData.shortInfo);
  dfTag.innerHTML = extra_info.targetsDF;
  upgTag.innerHTML = extra_info.upgrades;
  stationTag.innerHTML = extra_info.stationInfo;
  if(settings.languages_and_PAs) langTag.innerHTML = languagesCount(crewData, specificFlightData.shortInfo.flightLegs.slice(1));
  else langTag.innerHTML = "";
  if(settings.ramadan){
    ramadanTag.innerHTML = extra_info.ramadan;
  } else {
    ramadanTag.innerHTML = ""
  }
} else {
  dfTag.innerHTML = "";
  upgTag.innerHTML = "";
  stationTag.innerHTML = "";
}

if ([10,12,13].includes(fleet[registration])){
  W_selector(crewData, positions);
}

  localStorage.setItem("crewData", JSON.stringify(crewData));
  if (doPositions) { // Runs only if generating positions (does not run for "List only" option)
    let {thisFlightPositions, thisFlightBreaks} = loadPositions(crewData, registration, isULR, false); // False is important to switch mode of load_position function (with false it will run through vcm also)
    console.warn("Positions loaded successfully");
    localStorage.setItem("thisTripPositions", JSON.stringify(thisFlightPositions));
    localStorage.setItem("thisTripBreaks", JSON.stringify(thisFlightBreaks));
    generatePositions(crewData, thisFlightPositions, thisFlightBreaks, registration, numberOfDuties, hasBreak);
  } 
  localStorage.setItem("registration", registration);
  localStorage.setItem("numberOfDuties", numberOfDuties);
  localStorage.setItem("hasBreak", hasBreak);
  localStorage.setItem("doPositions", doPositions);
  if (settings.languages_and_PAs) filterLanguages(specificFlightData.shortInfo.flightLegs.slice(1))  // Additional info languages below positions table
  createOutput(crewData, numberOfDuties, hasBreak, doPositions);
}

document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.shiftKey && event.code === "KeyH") {
    hideGUI()
  }
});