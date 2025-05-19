import {urls} from '../data/urls.js';
import {autoCorrectBreaks} from '../functions/auto_correct_breaks.js'
import {repeatHighlight} from '../functions/repeat_highlights.js'
import {badges} from '../functions/badges.js'
import {languageHighlight} from '../functions/languages.js'
import {fleet} from '../data/fleet.js';

const positionsW = {
    //A380
    10: ["MR3A", "MR2 (MR3A)", "MR1"], 
    14: ["MR3A", "MR2 (MR3A)", "MR1"],
    15: ["MR3A", "MR2 (MR3A)", "MR1"],
    //B777
    12: ["L3", "R3"],
    16: ["L3", "R3"],
    //A350
    13: ["L2", "R2"]
}

export function createOutput(crewList, numberOfSectors, hasBreak, doPositions) {
    const settings = JSON.parse(localStorage.getItem('settings'));
    const aircraftType = fleet[localStorage.getItem('registration')];
    console.log(aircraftType)

    let positionsHeaders = '';
    for (let k=0; k< numberOfSectors; k++){
        positionsHeaders +=`<th class="crewTableHeader" group="position${k+1}">Position</th>`;
        if (hasBreak[k]) positionsHeaders += `<th class="crewTableHeader" group="break${k+1}">Break</th>`
    }
    const header = `
        <table style="border-collapse:collapse;">  
            <tr>
                <th class="crewTableHeader" group="grade">Grade</th>
                <th class="crewTableHeader" group="nickname">Nickname</th>
                ${positionsHeaders}
                <th class="crewTableHeader" group="fullName">Full name</th>
                <th class="crewTableHeader" style="font-size:smaller;" group="staffNumber">Staff number</th>
                <th class="crewTableHeader" group="nationality">Nationality</th>
                <th class="crewTableHeader" group="languages">Languages</th>
                <th class="crewTableHeader" group="timeInGrade">Time in grade</th>
                <th class="crewTableHeader" group="badges">Badges</th>
                <th class="crewTableHeader" group="flown">Flown</th>
                <th class="crewTableHeader" group="comment">Comment</th>
            </tr>`;
    const footer = `</table><div>*Positions may be adjusted to accommodate MFP2.0 or other operational requirements</div>
    <div>⚠️ To change you comment click <a href="${urls.updateComment}">here</a> and then press "Edit"</div>`;
    //    <div> 👍 If you like this app, find the source code <a href="${urls.sourceCode}" target="_blank">here</a></div>
    let lastGrade = "";
    let fileContent = "";
    crewList.sort((a, b) => a.index - b.index) // Ascending. Required due to manual selection of W so crew can shuffle around their grades
    crewList.forEach(createTable);

    document.querySelector("#crewOutput").innerHTML = header + fileContent + footer;

    if (settings.break_auto_correction && hasBreak.some(element => element === true)) {
        const positions_cells = document.querySelectorAll(".autoBreaks")
        positions_cells.forEach((cell) => cell.addEventListener("focusout", (event) => autoCorrectBreaks(event)))
    }
    if (settings.repeated_positions_highlight) {
        const positions_cells = document.querySelectorAll(".repeatHighlight")
        positions_cells.forEach((cell) => cell.addEventListener("focusout", (event) => repeatHighlight(event)))
    }

    function createTable(item, index) {
        // Create separation lines in tablet between cabins. Decoration for better visuals
        if (lastGrade !== item.grade) {
            switch (item.grade) {
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
                    fileContent += `<tr><td class="centerCell" colspan="30" style="background-color:#c584e6"><b>Premium class</b></td></tr>`;
                    break;
                case "GR2":
                    fileContent += `<tr><td class="centerCell" colspan="30" style="background-color:#52BE80"><b>Economy class</b></td></tr>`;
                    break;
                default:
                    break;
            }
        }
        fileContent += `<tr><td class="centerCell" group="grade">${item.originalGrade}</td>
                            <td group="nickname">${item.nickname}</td>`;
        for (let i = 0; i < numberOfSectors; i++) {
            console.log(item[`position${i}`] in positionsW[aircraftType])
            console.log(item[`position${i}`])
            console.log(positionsW[aircraftType])


            fileContent += `<td group="position${i+1}" class="centerCell showBadgeButton ${settings.break_auto_correction && hasBreak[i] ? "autoBreaks" : ""} ${settings.repeated_positions_highlight ? "repeatHighlight" : ""}" contenteditable>${doPositions ? item[`position${i}`] : ""}
                ${item.doingDF && doPositions ? ` <span class="badge badge-ir" title="Retail operator" onclick="badgeMenu(event)">IR</span>` : ""}
                ${settings.languages_and_PAs && item.doingPA[i] ? `<span class="badge badge-pa" title="`+item.doingPA[i].join(", ")+`" onclick="badgeMenu(event)">PA</span>` : ""}
                ${[10,12,13,14,15,16].includes(aircraftType) && positionsW[aircraftType].includes(item[`position${i}`]) ? `<span class="badge badge-w" onclick="badgeMenu(event)">W</span>` : ""}
                ${settings.positions_badges ? `<span style="diplay:none" contenteditable="false"> </span><span class="invisible badgeButton" onclick="badgeMenu(event, false)">+</span>` : ""}
                </td>`; /* Перший span це заглушка */
            if (hasBreak[i]) fileContent += `<td group="break${i+1}" class="centerCell" contenteditable>${doPositions ? item[`break${i}`] : ""}</td>`
        }
        fileContent += `<td group="fullName">${item.fullname}</td>
                        <td group="staffNumber" class="centerCell">${item.staffNumber}</td>
                        <td group="nationality"><img class="mini-flag" src="../src/flags/${item.flag}.png"> ${item.nationality}</td>
                        <td group="languages">${languageHighlight(item.languages)}</td>
                        <td group="timeInGrade" class="centerCell" style="font-size:smaller;">${item.timeInGrade}</td>
                        <td group="badges" class="centerCell">${item.ratingIR < 21 ? item.ratingIR < 10 ? `<span class="badge badge-ir" title="Duty free rating" style="padding: 0 0.4rem">${item.ratingIR}</span>` : `<span class="badge badge-ir" title="Duty free rating">${item.ratingIR}</span>` : ""} ${badges(item.badges)}</td>
                        <td group="flown" class="centerCell">${Object.keys(item.destinationExperience).length > 1 ? JSON.stringify(item.destinationExperience).replaceAll(/[{}"]/g,"").replaceAll(","," ") : item.destinationExperience[Object.keys(item.destinationExperience)[0]]}</td>
                        <td group="comment" title="${item.comment}">${item.comment.length <= 40 ? item.comment : item.comment.slice(0, 39) + "..."}</td></tr>`;
        lastGrade = item.grade;
    }  

    if (settings.clickable_headers) {
        const crewTableHeaders = document.querySelectorAll(".crewTableHeader");
        for (let header of crewTableHeaders){
            header.addEventListener("click", hideColumn)
        }
    }
    const showButton = document.querySelector("#buttonShowHiddenCells")
    if (!showButton.classList.contains("hidden")) showButton.classList.add("hidden")
}