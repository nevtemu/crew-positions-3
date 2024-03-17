import settings from './settings.json' assert { type: "json" };

// Data
import fleet from './data/fleet.json' assert { type: "json" };
import typesOfAircraft from './data/aircraft_type.json' assert { type: "json" };
import qualifications from './data/qualifications.json' assert { type: "json" };
import urls from './data/urls.json' assert { type: "json" };
import {breaks} from './data/breaks.js';
import {positions} from './data/positions.js';

// Functions
import {additional_info} from './functions/additional_info.js'
import {birthday_check} from './functions/birthday_check.js'
import {W_selector} from './functions/W_selector.js'
import {vcmRules} from './functions/vcm_rules.js'
import {extraRules} from './functions/extra_rules.js'
import {badges} from './functions/badges.js'
import fleetAge from './data/fleet_age.json' assert { type: "json" };

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
  generateTripsTable();
  window.opener.postMessage("Thank you", "*");
});

// Trips table
function requiredCrewNumber (typesOfAircraft) {
  let thisFlightPositions = positions[typesOfAircraft];
  let positionsList = [];
  Object.keys(thisFlightPositions).forEach((grade) => {
    if (grade !== "EXTRA") {
      Object.keys(thisFlightPositions[grade]).forEach((item) => positionsList = [...positionsList, ...thisFlightPositions[grade][item]]);
    }
  });
  return positionsList.length;
}

function generateTripsTable() {
  Object.keys(dataPool).forEach((item, index) => {
    let output = `<tr id="row${index}">`;
    let flightNumber = dataPool[item].shortInfo.flightNumber;
    let flightLegs = dataPool[item].shortInfo.flightLegs.join("-");
    let sectors = dataPool[item].shortInfo.sectors;
    let hasRest = dataPool[item].shortInfo.longest >= 9.5 ? true : false;
    let flightDate = dataPool[item].shortInfo.flightDate.toLocaleDateString("en-GB");
    let registration, description, crc, typeOfOperation, age;
    registration = description = crc = typeOfOperation = age = "";
    let hasRegistration = "flightData" in dataPool[item] && dataPool[item].flightData.FlightData[0].AircraftTail != null; //For reserve trips and trips that were long time ago portal returns null for aircraft registration (AircraftTail)
    if ("flightData" in dataPool[item] && !hasRegistration) errorHandler(`Flight ${flightNumber} on ${flightDate} missing data from portal`,"error");
    if (hasRegistration) {
      registration = dataPool[item].flightData.FlightData[0].AircraftTail;
      if (registration in fleet){
        description = typesOfAircraft[fleet[registration]].description;
        crc = typesOfAircraft[fleet[registration]].crc;
        age = fleetAge[registration]
      } else {
        errorHandler(`Registration ${registration} for flight number ${flightNumber} not found`, "error");
        hasRegistration = false;
      }

      typeOfOperation = dataPool[item].flightData.FlightData[0].ServiceType;
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
    if ("crewData" in dataPool[item] && hasRegistration) {
      crewNumber = dataPool[item].crewData.length;
      vcm = requiredCrewNumber (fleet[registration]); 
    }
    let vcm_output = vcm - crewNumber === 0 ? "" : (vcm - crewNumber) * -1 < 0 ? (vcm - crewNumber) * -1 : "+" + (vcm - crewNumber) * -1;
    output += `<td id="VCM${index}" style=${crewNumber - vcm < 0 ? "color:red" : crewNumber - vcm > 0 ? "color:darkgreen" : ""}>${vcm_output}</td>`;
    output += `<td id="crewNumber${index}">${vcm !== "" ? crewNumber + "/" + vcm : ""}</td>`;
    output += "crewData" in dataPool[item] ? hasRegistration /* Could have another check here for type of operation `&& typeOfOperation === "Passenger flight"` but information from portal was inconsistent */ ? 
    `<td style="border:none;background:white;"><button id="buttonList${index}" onclick="start(event, ${index}, ${false})">List only</button><button id="buttonGenerate${index}" onclick="start(event, ${index}, ${true})">Generate</button></td>` /* Renders if all data is available */ :
    `<td style="border:none;background:white;""><button id="buttonList${index}" onclick="start(event, ${index}, ${false})">List only</button><button id="buttonRegistration${index}" onclick="showRegistrationInputField(event, ${index})">Add registration</button><span id="registrField${index}" class="hidden"><input id="registrInput${index}" type=text value="A6E" maxlength="5" size="5" onkeypress="return /[0-9a-zA-Z]/i.test(event.key)" style="text-transform:uppercase"/><button id="buttonOK${index}" onclick="addAircraftRegistrationManually(${index})">OK</button></span></td>` /* Renders if only crew data is available */ :
    "";
    output += `</tr>`;
    document.querySelector("#cardContainer").innerHTML += output;
  });
  renderer([document.querySelector("#tripsTable")],[document.querySelector("#fetchTable")]);
}

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
  const ramadanTag = document.querySelector("#ramadanOutput");
  
  const extra_info = additional_info(specificFlightData.shortInfo);
  
  dfTag.innerHTML = extra_info.targetsDF;
  upgTag.innerHTML = extra_info.upgrades;
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

export function back() {
  renderer([document.querySelector("#tripsTable")],[document.querySelector("#crewTable"),document.querySelector("#flightInfo"),document.querySelector("#errorTable"),document.querySelector("#keyBind"),],true);
}

function loadCrew(inputData) {
  let crewData = [];
  inputData.forEach((crew, index) => {
        let badges = [],languages = [], ratingIR = 21;
        crew.Profile.split(",").forEach((badge) => {
          badge.split(" - ", 1).forEach((code) => {
            if (Object.keys(qualifications.languages).includes(code))
              languages.push(qualifications.languages[code]);
            else if (Object.keys(qualifications.DFratings).includes(code))
              ratingIR = qualifications.DFratings[code];
            else if (Object.keys(qualifications.important).includes(code))
              badges.push(parseInt(code));
          });
        });
        if (crew.OperationGrade !== crew.HRGrade) errorHandler(["PUR", "CSV"].includes(crew.OperationGrade) ? `${crew.FirstName} on the pool` : `${crew.FirstName} operates out of grade`,"info");
        crewData.push({
          index,
          ratingIR,
          languages,
          badges,
          grade: crew.OperationGrade,
          originalGrade: crew.OperationGrade,
          outOfGrade: crew.OperationGrade !== crew.HRGrade, //RosterGrade
          flag: crew.NationalityCode,
          staffNumber: crew.StaffID,
          timeInGrade: crew.GradeExp,
          doingDF: false,
          birthday: new Date(crew.DOB),
          timeInGradeNumber: crew.OperationGrade !== crew.RosterGrade ? 0 : timeInGradeNumber(crew.GradeExp),
          lastPosition: ["PUR", "CSA"].includes(crew.OperationGrade) ? [] : ["GR1", "FG1", "CSV"].includes(crew.OperationGrade) ? [""] : ["", ""],
          comment: "SocialStatus" in crew && crew.SocialStatus !== null ? crew.SocialStatus.replaceAll("'", "&apos;").replaceAll("\"","&quot;") : "",
          nickname: "NickName" in crew && crew.NickName !== "" ? crew.NickName : crew.FirstName.split(" ")[0],
          fullname: crew.FirstName + " " + crew.LastName,
          destinationExperience: crew.destinationExperiences.map((item) => item.VisitedCount).slice(0, -1), //Slice to remove DXB experience
          nationality: crew.Nationality.replace("Korea, Republic Of", "Korea") //Replace few official countries names for easy reading
            .replace("Moldova, Republic Of", "Moldova")
            .replace("Czech Republic", "Czech")
            .replace("Taiwan, Province Of China", "Taiwan")
            .replace("United Arab Emirates", "UAE")
            .replace("Russian Federation", "Russia")
            .replace("Bosnia And Herzegovina", "Bosnia")
            .replace("Republic Of Macedonia", "Macedonia")
            .replace("Syrian Arab Republic", "Syria")
            .replace("Brunei Darussalam", "Brunei")
        });
  });
  console.log(crewData);
  return crewData;
}

function loadPositions(crewData, registration, isULR) {
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

function generatePositions (crewData, positions, registration, numberOfDuties = 1, hasBreaks = false) {
  for (let i = 0; i < numberOfDuties; i++) {
    let p = JSON.parse(JSON.stringify(positions));

    //Select DF
    let numberOfRetailOperators = typesOfAircraft[fleet[registration]].aircraftModel === "A380" ? 2 : 1; 
    let crewsWithRating = crewData.filter((crew) =>crew.ratingIR <= 20 && ["FG1", "GR1", "GR2"].includes(crew.grade)).sort((a, b) => a.ratingIR - b.ratingIR);
    if (crewsWithRating.length < numberOfRetailOperators) { // If not enough DF rating crew, add most junior Gr1
      let candidates = crewData.filter((crew) =>crew.grade === "GR1" && crew.outOfGrade === false && crew.ratingIR > 20).sort((a, b) => a.timeInGradeNumber - b.timeInGradeNumber);
      while (crewsWithRating.length < numberOfRetailOperators) { 
        crewsWithRating.push(candidates.shift());
      }
      if (i === 1) errorHandler("Not enoughDF rating crew", "error");
    }
    while (crewsWithRating.length > numberOfRetailOperators) crewsWithRating.pop(); // Remove extra DF crew (with lowest rating)
    if (numberOfRetailOperators === 2 && crewsWithRating[0].grade === crewsWithRating[1].grade) {// If A380 and both DF crew are same grade add DF position
      if (p[crewsWithRating[0].grade].remain.length > 0){
        p[crewsWithRating[0].grade].df.push(p[crewsWithRating[0].grade].remain.shift());
      } else if (p[crewsWithRating[0].grade].galley.length > 0) { // This only required for edgy case when both top sellers are W crew
        p[crewsWithRating[0].grade].df.push(p[crewsWithRating[0].grade].galley.shift());
      } else {
        errorHandler("Error when shifting positions for DF", "error");
      }
    }
    crewsWithRating.forEach((crew) => {
      let x = crewData.findIndex((staff) => staff.staffNumber === crew.staffNumber);
      crewData[x].doingDF = true;
      crewData[x][`position${i}`] = p[crew.grade].df.shift();
    });
    ["FG1", "GR1", "GR2"].forEach((grade) => {// Add unused DF positions to remain so they can be used by non-DF crew
      if (grade in p) {
        p[grade].remain = [...p[grade].remain, ...p[grade].df];
        p[grade].df = [];
      }
    });
    //End of DF Selector
  

    //Select positions
    Object.keys(p).forEach((grade) => {
      if (["PUR", "CSV", "CSA"].includes(grade)) {
        p[grade].only.forEach((position) => {
          let candidateCrew = crewData.filter((crew) => crew.grade === grade && !crew.hasOwnProperty(`position${i}`));
          let candidateCrewNewPosition;
          if ("CSV" === grade) { // Only CSV can be >1. Check to get new position (not same as last sector)
            candidateCrewNewPosition = candidateCrew.filter((crew) => !crew.lastPosition.includes(position));
            if (candidateCrewNewPosition.length > 0) candidateCrew = candidateCrewNewPosition;
          }
          let random = getRandomNumber(0, candidateCrew.length - 1);
          let x = crewData.findIndex((staff) => staff.staffNumber === candidateCrew[random].staffNumber);
          crewData[x][`position${i}`] = position;
          crewData[x].lastPosition.shift();
          crewData[x].lastPosition.push(position);
        });
      } 
      else if (["FG1", "GR1", "GR2", "W"].includes(grade)) {
        p[grade].galley.forEach((position) => { // Galley position to crew over 6 month
          let candidateCrew = crewData.filter((crew) => crew.grade === grade && !crew.hasOwnProperty(`position${i}`) && crew.timeInGradeNumber > 6);
          if (candidateCrew.length > 1) {
            let candidateCrewNewPosition = candidateCrew.filter((crew) => !crew.lastPosition.includes(position));
            if (candidateCrewNewPosition.length > 0) candidateCrew = candidateCrewNewPosition;
          }
          let x;
          if (candidateCrew.length < 1) { // If no senior crew (over 6 month) then give galley to most senior
            candidateCrew = crewData.filter((crew) => crew.grade === grade && !crew.hasOwnProperty(`position${i}`)).sort((a, b) => b.timeInGradeNumber - a.timeInGradeNumber);
            x = crewData.findIndex((staff) => staff.staffNumber === candidateCrew[0].staffNumber);
            if (i === 1)errorHandler(`No senior crew for galley in grade: ${grade}`, "error");
          } else {
            let random = getRandomNumber(0, candidateCrew.length - 1);
            x = crewData.findIndex((staff) => staff.staffNumber === candidateCrew[random].staffNumber);
          }
          crewData[x][`position${i}`] = position;
          crewData[x].lastPosition.shift();
          crewData[x].lastPosition.push(position);
        });
        p[grade].remain.forEach((position) => {
          let candidateCrew = crewData.filter((crew) => crew.grade === grade && !crew.hasOwnProperty(`position${i}`));
          let candidateCrewNewPosition = candidateCrew.filter((crew) => !crew.lastPosition.includes(position));
          if (candidateCrewNewPosition.length > 0) candidateCrew = candidateCrewNewPosition;
          let random = getRandomNumber(0, candidateCrew.length - 1);
          let x = crewData.findIndex((staff) => staff.staffNumber === candidateCrew[random].staffNumber);
          crewData[x][`position${i}`] = position;
          crewData[x].lastPosition.shift();
          crewData[x].lastPosition.push(position);
        });
      } 
    });

    //Select breaks
    if (hasBreaks) {
      crewData.forEach((crew) => (crew[`break${i}`] = breaks[fleet[registration]].hasOwnProperty(crew[`position${i}`]) ?
        breaks[fleet[registration]][crew[`position${i}`]] : "")
      );
    }

  }
  return crewData;
}

function createOutput(crewList, numberOfSectors, hasBreak, doPositions) {
  const header = `
      <table style="border-collapse:collapse;">  
          <tr>
              <th>Grade</th>
              <th>Nickname</th>
              ${("<th>Position</th>" + (hasBreak ? "<th>Break</th>" : "")).repeat(numberOfSectors)}
              <th>Full name</th>
              <th style="font-size:smaller;">Staff number</th>
              <th>Nationality</th>
              <th>Languages</th>
              <th>Time in grade</th>
              <th>Badges</th>
              <th>Flown</th>
              <th>Comment</th>
          </tr>`;
  const footer = `</table><div>*Positions may be adjusted to accommodate MFP2.0 or other operational requirements</div><div>⚠️ To change you comment click <a href="${urls.updateComment}">here</a> and then press "Edit"</div>`;
  let fileContent = "";
  let lastGrade = "";
  crewList.forEach(createTable);

  function createTable(item, index) {
    // Create separation lines in tablet between cabins. Decoration for better visuals
    if (lastGrade !== item.grade) {
      switch(item.grade){
        case "PUR": case "CSV":
          if (lastGrade == "") fileContent += `<tr><td class="centerCell"colspan="30" style="background-color:#F7DC6F"><b>Seniors</b></td></tr>`;
          break;
        case "FG1":
          fileContent += `<tr><td class="centerCell" colspan="30" style="background-color:#EC7063"><b>First class</b></td></tr>`;
          break;
        case "GR1":
          fileContent += `<tr><td class="centerCell" colspan="30" style="background-color:#5DADE2"><b>Business class</b></td></tr>`;
          break;
        case "W":
          fileContent += `<tr><td class="centerCell" colspan="30" style="background-color:#c584e6"><b>Premium economy class</b></td></tr>`;
          break;
        case "GR2":
          fileContent += `<tr><td class="centerCell" colspan="30" style="background-color:#52BE80"><b>Economy class</b></td></tr>`;
          break;
        default:
          break;
      }
    }
    fileContent += `<tr><td class="centerCell">${item.originalGrade}</td>
                        <td>${item.nickname}</td>`;
    for (let i = 0; i < numberOfSectors; i++) {fileContent += `<td class="centerCell showMFPbutton ${settings.break_auto_correction && hasBreak ? "autoBreaks" : ""} ${settings.repeated_positions_highlight ? "repeatHighlight" : ""}" contenteditable>${doPositions ? item[`position${i}`] : ""}
            ${item.doingDF && doPositions ? ` <span class="badge badge-ir" title="Retail operator">IR</span>` : ""}
            <span style="diplay:none" contenteditable="false"> </span><span class="invisible buttonMFP" onclick="addMFP(event)">+</span></td>`; /* Перший це заглушка */ 
        if (hasBreak)fileContent += `<td class="centerCell" contenteditable>${doPositions ? item[`break${i}`] : ""}</td>`}
    fileContent += `<td>${item.fullname}</td>
                    <td class="centerCell">${item.staffNumber}</td>
                    <td><img src="${urls.flag+item.flag}.png"> ${item.nationality}</td>
                    <td>${item.languages.join(", ")}</td>
                    <td class="centerCell" style="font-size:smaller;">${item.timeInGrade}</td>
                    <td class="centerCell">${item.ratingIR < 21 ? item.ratingIR < 10 ? `<span class="badge badge-ir" title="Duty free rating" style="padding: 0 0.4rem">${item.ratingIR}</span>` : `<span class="badge badge-ir" title="Duty free rating">${item.ratingIR}</span>` : ""} ${badges(item.badges)}</td>
                    <td class="centerCell">${item.destinationExperience.join(" ")}</td>
                    <td title="${item.comment}">${item.comment.length <= 40 ? item.comment : item.comment.slice(0, 39) + "..."}</td></tr>`;
    lastGrade = item.grade;
  }  //end of createTable
  document.querySelector("#crewOutput").innerHTML = header + fileContent + footer;

  if (settings.break_auto_correction && hasBreak){
    const positions_cells = document.querySelectorAll(".autoBreaks")
    positions_cells.forEach((cell) => cell.addEventListener("focusout", (event) => autoCorrectBreaks (event)))
  }
  if (settings.repeated_positions_highlight){
    const positions_cells = document.querySelectorAll(".repeatHighlight")
    positions_cells.forEach((cell) => cell.addEventListener("focusout", (event) => repeatHighlight (event)))
  }
}

// Supporting functions
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function renderer(visibleElements, invisibleElements = [], toClear = false) {
  if (Array.isArray(visibleElements) && Array.isArray(invisibleElements)) {
    visibleElements.forEach((element) => element.classList.remove("hidden"));
    invisibleElements.forEach((element) => element.classList.add("hidden"));
  } else {
    console.error("Renderer function error");
  }
  if (toClear) {
    document.querySelector("#errorOutput").innerHTML = "";
    document.querySelector("#crewOutput").innerHTML = "";
  }
}

function errorHandler(message, style) {
  document.querySelector("#errorOutput").innerHTML += `<div class="warn message-${style}">${message}<div>`;
  renderer([document.querySelector("#errorTable"),document.querySelector("#keyBind"),]);
}

export function hideErrors() {
  renderer([], [document.querySelector("#errorTable")]);
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

export function showRegistrationInputField(event, n) {
  renderer([document.querySelector(`#registrField${n}`)],[document.querySelector(`#buttonRegistration${n}`)]);
}

export function addAircraftRegistrationManually (n) {
  let registration = document.querySelector(`#registrInput${n}`).value.toUpperCase();
  if (fleet.hasOwnProperty(registration)) {
    dataPool[Object.keys(dataPool)[n]].flightData.FlightData[0].AircraftTail = registration;
    document.querySelector("#cardContainer").innerHTML = "";
    generateTripsTable();
  } else {
    errorHandler(`Registration you entered ${registration} is not found`,"error");
  }
}

function timeInGradeNumber (string) {
  let elements = string.split(" ");
  let y = parseInt(elements[0]);
  let m = parseInt(elements[2]);
  return m + y * 12;
}

export function addMFP (event){
  const tagMFP = ` <span class="badge badge-mfp" title="MFP">MFP</span>`;
  const location = event.target.parentElement;
  location.innerHTML += tagMFP;
}


function autoCorrectBreaks (e) {
  const registration = localStorage.getItem("registration")
  const thisPosition = e.target.innerText.trim().split(" ")[0]
  const relatedBreak = e.target.nextSibling;
  relatedBreak.innerText = breaks[fleet[registration]].hasOwnProperty(thisPosition) ? breaks[fleet[registration]][thisPosition] : ""
}

function repeatHighlight (e) {
  const thisPosition = e.target.innerText.trim().split(" ")[0]
  const thisCell = e.target;
  const columnIndex = e.target.cellIndex;
  let allRows = e.target.parentElement.parentElement.childNodes; // Go two levels up to <tbody> and grab its children
  let positionsInColumn = []
  allRows = Array.from(allRows).filter(row => row.children[columnIndex] !== undefined && row.children[columnIndex].innerText !== "Position")
  allRows.forEach(row => positionsInColumn.push(row.children[columnIndex].innerText.trim().split(" ")[0]))
  allRows.forEach(row => row.children[columnIndex].classList.remove("repeated"))
  // console.log(positionsInColumn)
  const repeatingPositions = positionsInColumn.filter((item, index) => positionsInColumn.indexOf(item) !== index);

  if (repeatingPositions.length){
    const repeatingRows = allRows.filter(row => repeatingPositions.includes(row.children[columnIndex].innerText.trim().split(" ")[0]))
    console.log(repeatingRows)
    repeatingRows.forEach(row => row.children[columnIndex].classList.add("repeated"))
  }
}