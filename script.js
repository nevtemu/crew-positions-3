import settings from './settings.json' assert { type: "json" };

import fleet from './data/fleet.json' assert { type: "json" };
import typesOfAircraft from './data/aircraft_type.json' assert { type: "json" };
import qualifications from './data/qualifications.json' assert { type: "json" };
import {breaks} from './data/breaks.js';
import {positions} from './data/positions.js';

let dataPool; // To store data from portal

import {additional_info} from './functions/additional_info.js'
import fleetAge from './data/fleet_age.json' assert { type: "json" };

// Connection
window.onload = function () {
  if (window.opener !== null) {
    renderer([document.querySelector("#fetchTable")]);
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

  
  
  //Birthday check
  let flightDates = [
    new Date(convertDate(specificFlightData.flightData.FlightData[0].DepartureDate)),
    new Date(convertDate(specificFlightData.flightData.FlightData[specificFlightData.flightData.FlightData.length - 1].DepartureDate))
  ];
  flightDates = [ //Adjustment one day before and after trip to catch birthdays on those days
    new Date(flightDates[0].setDate(flightDates[0].getDate() - 1)),
    new Date(flightDates[1].setDate(flightDates[1].getDate() + 1)),
  ];
  crewData.forEach((crew) => {hasBirthday(crew, flightDates) ? crew.badges.push(1) : false;});
  //end of birthday check

  let registration = specificFlightData.flightData.FlightData[0].AircraftTail;
  let numberOfDuties = document.querySelector(`#sectors${n}`).value; //These values taken from page as user may change number of positions/breaks desired
  let hasBreak = document.querySelector(`#rest${n}`).checked;

//Upgrades and DF targets output
if (settings['additional-info']){
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

// W
  // Priority: 1) Gr2 with W badge, 2) gr1 as gr2, 3) most senior gr2
  if (fleet[registration] == 10){
    // 1) 
    let requiredWcrew = [];
    Object.keys(positions[10].W).forEach((item) => requiredWcrew = [...requiredWcrew, ...positions[10].W[item]]);
    let requiredWcrewLength = requiredWcrew.length;
    let crewW = crewData.filter((crew) => crew.grade == "GR2" && crew.badges.includes(170920));
    if (crewW.length > 0) {
      while (requiredWcrewLength > 0) {
        crewW[crewW.length - requiredWcrewLength].grade = "W";
        requiredWcrewLength--;
      } 
    }
    // 2)
    if (requiredWcrewLength > 0 && crewData.filter((crew) => crew.grade == "GR2").length < 9){
        let candidates = crewData.filter((crew) => crew.grade == "GR1");
        let q=candidates.length;
        for (q; q>8; q--){
          candidates[q-1].grade = "W";
          requiredWcrewLength--;
      } 
    }
    // 3)
    if (requiredWcrewLength > 0) {
      let candidates = crewData.filter((crew) => crew.grade == "GR2");
      for (let t=0; t <= requiredWcrewLength; t++){
        candidates[t].grade = "W";
        requiredWcrewLength--;
      }
    }


    
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
  let thisFlightPositions = JSON.parse(JSON.stringify([12, 11, 9, 8].includes(fleet[registration]) && isULR /* Check if it is A380 ULR */ ? positions[99] : positions[fleet[registration]])); 
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

function extraRules(thisFlightPositions, variations) {
  Object.keys(variations).forEach((grade) => {
    if (grade === "GR2") errorHandler(`You probably have ${variations[grade]} supy`, "warn")
    while (variations[grade] > 0) {
      if (["PUR", "CSV", "CSA"].includes(grade)) thisFlightPositions[grade].only.push(thisFlightPositions.EXTRA.only.pop());
      else thisFlightPositions[grade].remain.push(thisFlightPositions.EXTRA.only.pop());
      variations[grade]--;
    }
  });
  return thisFlightPositions;
}

function vcmRules(vcm, p, aircraftType, isULR) {
  switch (aircraftType) {
    // B777-300 3 class
    case 1:
    case 2:
    case 3:
    case 6:
      if (vcm < 0) {
        p.GR2.remain.splice(p.GR2.remain.indexOf("L5A"), 1);
      }
      if (vcm < -1) {
        p.GR1.galley.splice(p.GR1.galley.indexOf("L2A"), 1);
        p.GR2.remain.splice(p.GR2.remain.indexOf("L4"), 1);
        p.GR1.galley.push("L4 (L2A)");
      } else break;
      if (vcm < -2) {
        p.CSV.only.splice(p.CSV.only.indexOf("R2A"), 1);
        p.GR2.remain.splice(p.GR2.remain.indexOf("R4"), 1);
        p.CSV.only.push("R4 (R2A)");
      } else break;
      if (vcm < -3) {
        p.FG1.df.splice(p.FG1.df.indexOf("R1"),1);
        p.GR2.df.splice(p.GR2.df.indexOf("R3"),1);
        p.PUR.only.splice(p.PUR.only.indexOf("PUR"),1);
        p.FG1.df.push("R3 (L1)");
        p.PUR.only.push("L1 (PUR)");
      } else break;
      if (vcm < -4) {
        console.error("Less than minimum crew requirement to operate");
      } 
      break;
    // B777-200 2 class
    case 4:
      if (vcm < 0) {
        p.GR2.remain.splice(p.GR2.remain.indexOf("L4A"), 1);
      } else break;
      if (vcm < -1) {
        p.GR1.galley.splice(p.GR1.galley.indexOf("L1A"), 1);
        p.GR2.df.splice(p.GR2.df.indexOf("L2"), 1);
        p.GR1.galley.push("L2 (L1A)");
      } else break;
      if (vcm < -2) {
        p.CSV.only.splice(p.CSV.only.indexOf("R1A"), 1);
        p.GR2.remain.splice(p.GR2.main.indexOf("R2"), 1);
        p.CSV.only.push("R2 (R1A)");
      } else break;
      if (vcm < -3) {
        p.GR1.remain.splice(p.GR1.remain.indexOf("L1"),1);
        p.GR2.remain.splice(p.GR2.remain.indexOf("R3"),1);
        p.PUR.only.splice(p.PUR.only.indexOf("PUR"),1);
        p.GR1.main.push("R3 (L1)");
        p.PUR.only.push("L1 (PUR)");
      } else break;
      if (vcm < -4) {
        console.error("Less than minimum crew requirement to operate");
      }
      break;
    // B777-300 2 class
    case 5:
      if (vcm < 0) {
        p.GR2.remain.splice(p.GR2.remain.indexOf("L5A"), 1);
      }
      if (vcm < -1) {
        p.GR1.df.splice(p.GR1.df.indexOf("R1A"), 1);
        p.GR2.remain.splice(p.GR2.remain.indexOf("R2"), 1);
        p.GR1.df.push("R2 (R1A)", 1);
      } else break;
      if (vcm < -2) {
        p.GR1.galley.splice(p.GR1.galley.indexOf("L1A"), 1);
        p.GR2.df.splice(p.GR2.df.indexOf("L2"), 1);
        p.GR1.galley.push("L2 (L1A)");
      } else break;
      if (vcm < -3) {
        p.GR1.remain.splice(p.GR1.remain.indexOf("L1"),1);
        p.GR2.remain.splice(p.GR2.remain.indexOf("R3"),1);
        p.PUR.only.splice(p.PUR.only.indexOf("PUR"),1);
        p.GR1.remain.push("R3 (L1)");
        p.PUR.only.push("L1 (PUR)");
      } else break;
      if (vcm < -4) {
        console.error("Less than minimum crew requirement to operate");
      }
      break;
    // A380-800 3 class 
    case 8:
    case 9:
    case 11:
    case 12:
    case 99:
      if (vcm < 0) {
        p.GR2.remain.splice(p.GR2.remain.indexOf("ML4"), 1);
        p.GR1.df.splice(p.GR1.df.indexOf("ML4A"), 1);
        p.GR1.df.push("ML4 (ML4A)");
      }
      if (vcm < -1) {
        p.GR2.remain.splice(p.GR2.df.indexOf("MR5"), 1);
        p.GR1.galley.splice(p.GR1.galley.indexOf("MR4A"), 1);
        p.GR1.galley.push("MR5 (MR4A)");
      } else break;
      if (vcm < -2) {
        p.GR2.remain.splice(p.GR2.remain.indexOf("ML3"), 1);
        p.GR1.galley.splice(p.GR1.galley.indexOf("ML3A"), 1);
        p.GR1.galley.push("ML3 (ML3A)");
      } else break;
      if (vcm < -3 && isULR){
        p.CSV.only.splice(p.CSV.only.indexOf("ML1"),1)
        p.PUR.only.splice(p.PUR.only.indexOf("PUR"),1)
        p.GR2.remain.splice(p.GR2.remain.indexOf("MR1"),1)
        p.PUR.only.push("ML1 (PUR)")
        p.CSV.only.push("MR1 (ML1)")
      } else if (vcm < -3){
        p.PUR.only.splice(p.PUR.only.indexOf("PUR"),1)
        p.GR2.remain.splice(p.GR2.remain.indexOf("ML1"),1)
        p.PUR.only.push("ML1 (PUR)")
      } else break;
      if (vcm < -4) {
        console.error("Less than minimum crew requirement to operate");
      }
      break;
    // A380-800 2 class
    case 7:
      if (vcm < 0) {
        p.GR2.remain.splice(p.GR2.remain.indexOf("ML3"), 1);
        p.GR1.galley.splice(p.GR1.galley.indexOf("ML3A"), 1);
        p.GR1.galley.push("ML3 (ML3A)");
      } else break;
      if (vcm < -1 && isULR){
        p.CSV.only.splice(p.CSV.only.indexOf("ML1"),1)
        p.PUR.only.splice(p.PUR.only.indexOf("PUR"),1)
        p.GR2.remain.splice(p.GR2.remain.indexOf("MR1"),1)
        p.PUR.only.push("ML1 (PUR)")
        p.CSV.only.push("MR1 (ML1)")
      } else if (vcm < -1){
        p.PUR.only.splice(p.PUR.only.indexOf("PUR"),1)
        p.GR2.remain.splice(p.GR2.remain.indexOf("ML1"),1)
        p.PUR.only.push("ML1 (PUR)")
      } else break;
      if (vcm < -2) {
        console.error("Less than minimum crew requirement to operate");
      }
      break;
    //A380-300 4 class
    case 10:
      if (vcm < 0) {
        p.W.galley.splice(p.W.galley.indexOf("MR3A"), 1);
        p.GR2.remain.splice(p.GR2.remain.indexOf("MR2"), 1);
        p.W.galley.push("MR2 (MR3A)");
      }
      if (vcm < -1) {
        p.GR2.remain.splice(p.GR2.remain.indexOf("ML4"), 1);
        p.GR1.df.splice(p.GR1.df.indexOf("ML4A"), 1);
        p.GR1.df.push("ML4 (ML4A)");
      } else break;
      if (vcm < -2) {
        p.GR2.remain.splice(p.GR2.remain.indexOf("MR5"), 1);
        p.GR1.galley.splice(p.GR1.galley.indexOf("MR4A"), 1);
        p.GR1.galley.push("MR5 (MR4A)");
      } else break;
      if (vcm < -3) {
        p.GR2.remain.splice(p.GR2.remain.indexOf("ML3"), 1);
        p.GR1.galley.splice(p.GR1.galley.indexOf("ML3A"), 1);
        p.GR1.galley.push("ML3 (ML3A)");
      } else break;
      if (vcm < -4) {
        p.CSV.only.splice(p.CSV.only.indexOf("ML1"),1)
        p.PUR.only.splice(p.PUR.only.indexOf("PUR"),1)
        p.GR2.remain.splice(p.GR2.remain.indexOf("MR1"),1)
        p.PUR.only.push("ML1 (PUR)")
        p.CSV.only.push("MR1 (ML1)")
      } else break;
      if (vcm < -5) {
        console.error("Less than minimum crew requirement to operate");
      }
      break;
    default:
      console.error("Aircraft type not found!");
  }
  return p;
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
  const footer = `</table><div>*Positions may be adjusted to accommodate MFP2.0 or other operational requirements</div>`;
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
    for (let i = 0; i < numberOfSectors; i++) {fileContent += `<td class="centerCell showMFPbutton" contenteditable>${doPositions ? item[`position${i}`] : ""}
            ${item.doingDF && doPositions ? ` <span class="badge badge-ir" title="Retail operator">IR</span>` : ""}
            <span style="diplay:none" contenteditable="false"> </span><span class="invisible buttonMFP" onclick="addMFP(event)">+</span></td>`; /* Перший це заглушка */ 
        if (hasBreak)fileContent += `<td class="centerCell" contenteditable>${doPositions ? item[`break${i}`] : ""}</td>`}
    fileContent += `<td>${item.fullname}</td>
                    <td class="centerCell">${item.staffNumber}</td>
                    <td><img src="https://emiratesgroup.sharepoint.com/sites/ccp/Shared Documents/ACI/country/${item.flag}.png"> ${item.nationality}</td>
                    <td>${item.languages.join(", ")}</td>
                    <td class="centerCell" style="font-size:smaller;">${item.timeInGrade}</td>
                    <td class="centerCell">${item.ratingIR < 21 ? item.ratingIR < 10 ? `<span class="badge badge-ir" title="Duty free rating" style="padding: 0 0.4rem">${item.ratingIR}</span>` : `<span class="badge badge-ir" title="Duty free rating">${item.ratingIR}</span>` : ""} ${badges(item.badges)}</td>
                    <td class="centerCell">${item.destinationExperience.join(" ")}</td>
                    <td title="${item.comment}">${item.comment.length <= 40 ? item.comment : item.comment.slice(0, 39) + "..."}</td></tr>`;
    lastGrade = item.grade;
  }  //end of createTable
  document.querySelector("#crewOutput").innerHTML = header + fileContent + footer;
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

function badges(badges) {
  const cakeSVG = `<svg height="1em" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.584 6.036c1.952 0 2.591-1.381 1.839-2.843-.871-1.693 1.895-3.155.521-3.155-1.301 0-3.736 1.418-4.19 3.183-.339 1.324.296 2.815 1.83 2.815zm5.212 8.951l-.444-.383a1.355 1.355 0 0 0-1.735 0l-.442.382a3.326 3.326 0 0 1-2.174.801 3.325 3.325 0 0 1-2.173-.8l-.444-.384a1.353 1.353 0 0 0-1.734.001l-.444.383c-1.193 1.028-2.967 1.056-4.204.1V19a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3.912c-1.237.954-3.011.929-4.206-.101zM10 7c-7.574 0-9 3.361-9 5v.469l1.164 1.003a1.355 1.355 0 0 0 1.735 0l.444-.383a3.353 3.353 0 0 1 4.345 0l.444.384c.484.417 1.245.42 1.735-.001l.442-.382a3.352 3.352 0 0 1 4.346-.001l.444.383c.487.421 1.25.417 1.735 0L19 12.469V12c0-1.639-1.426-5-9-5z"/></svg>`;
  const pttSVG = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9v28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5V291.9c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z"/></svg>`;
  const bpSVG = `<svg version="1.1"xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="1em" viewBox="0 0 32 32" xml:space="preserve"><path d="M27,8h-3.4l-1.2-2.3c-0.5-1-1.5-1.7-2.7-1.7h-7.5c-1.1,0-2.2,0.6-2.7,1.7L8.4,8H5c-1.7,0-3,1.3-3,3v14c0,1.7,1.3,3,3,3h22c1.7,0,3-1.3,3-3V11C30,9.3,28.7,8,27,8z M8,13H6c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S8.6,13,8,13z M16,24c-3.9,0-7-3.1-7-7s3.1-7,7-7s7,3.1,7,7S19.9,24,16,24z"/></svg>`;
  let output = "";
  badges.forEach((badge) => {
    switch (badge) {
      case 170920: output += `<span class="badge badge-w" title="Premium economy">W</span>`; break;
      case 24: case 25: output += `<span class="badge badge-pool" title="Pool">&#8679</span>`; break; 
      case 102: output += `<span class="badge badge-ps" title="Peer support">&#9825</span>`; break;
      case 20: case 21: output += `<span class="badge badge-bp" title="Business promotion">${bpSVG}</span>`; break;
      case 12: case 14: case 16: case 17: case 18: case 23: case 27: case 30: output += `<span class="badge badge-ptt" title="Trainer">${pttSVG}</span>`;
      case 24514: output += `<span class="badge badge-reloc" title="Relocated ID">&#8634;</span>`; break;
      case 1: output += `<span class="badge badge-bd" title="Birthday">${cakeSVG}</span>`; break;
      default: break;
    }
  });
  return output;
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

function convertDate(stringDate) {
  let day, month, year;
  [day, month, year] = stringDate.split(" ", 1)[0].split("/");
  return parseInt(month) + "/" + day + "/" + year;
}

function hasBirthday(crew, dates) {
  let bd1 = new Date(crew.birthday.setFullYear(dates[0].getFullYear()));
  if (dates[0].getTime() <= bd1.getTime() && bd1.getTime() <= dates[1].getTime()) return true;
  if (dates[0].getFullYear() !== dates[1].getFullYear()) {
    let bd2 = new Date(crew.birthday.setFullYear(dates[1].getFullYear()));
    if (dates[0].getTime() <= bd2.getTime() && bd2.getTime() <= dates[1].getTime()) return true;
  }
  return false;
}

export function addMFP (event){
  const tagMFP = ` <span class="badge badge-mfp" title="MFP">MFP</span>`;
  const location = event.target.parentElement;
  location.innerHTML += tagMFP;
}