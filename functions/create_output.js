import {urls} from '../data/urls.js';
import {autoCorrectBreaks} from '../functions/auto_correct_breaks.js'
import {repeatHighlight} from '../functions/repeat_highlights.js'
import {badges} from '../functions/badges.js'
import {languageHighlight} from '../functions/languages.js'

export function createOutput(crewList, numberOfSectors, hasBreak, doPositions) {
    const settings = JSON.parse(localStorage.getItem('settings'));

    let positionsHeaders = '';
    for (let k=0; k< numberOfSectors; k++){
        positionsHeaders +="<th>Position</th>";
        if (hasBreak[k]) positionsHeaders += "<th>Break</th>"
    }
    const header = `
        <table style="border-collapse:collapse;">  
            <tr>
                <th>Grade</th>
                <th>Nickname</th>
                ${positionsHeaders}
                <th>Full name</th>
                <th style="font-size:smaller;">Staff number</th>
                <th>Nationality</th>
                <th>Languages</th>
                <th>Time in grade</th>
                <th>Badges</th>
                <th>Flown</th>
                <th>Comment</th>
            </tr>`;
    const footer = `</table><div>*Positions may be adjusted to accommodate MFP2.0 or other operational requirements</div>
    <div>⚠️ To change you comment click <a href="${urls.updateComment}">here</a> and then press "Edit"</div>
    <div> 👍 If you like this app, find the source code <a href="${urls.sourceCode}" target="_blank">here</a></div>`;
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
        fileContent += `<tr><td class="centerCell">${item.originalGrade}</td>
                            <td>${item.nickname}</td>`;
        for (let i = 0; i < numberOfSectors; i++) {
            fileContent += `<td class="centerCell showBadgeButton ${settings.break_auto_correction && hasBreak[i] ? "autoBreaks" : ""} ${settings.repeated_positions_highlight ? "repeatHighlight" : ""}" contenteditable>${doPositions ? item[`position${i}`] : ""}
                ${item.doingDF && doPositions ? ` <span class="badge badge-ir" title="Retail operator" onclick="badgeMenu(event)">IR</span>` : ""}
                ${settings.languages_and_PAs && item.doingPA[i] ? `<span class="badge badge-pa" title="`+item.doingPA[i].join(", ")+`" onclick="badgeMenu(event)">PA</span>` : ""}
                ${settings.positions_badges ? `<span style="diplay:none" contenteditable="false"> </span><span class="invisible badgeButton" onclick="badgeMenu(event, false)">+</span>` : ""}
                </td>`; /* Перший це заглушка */
            if (hasBreak[i]) fileContent += `<td class="centerCell" contenteditable>${doPositions ? item[`break${i}`] : ""}</td>`
        }
        fileContent += `<td>${item.fullname}</td>
                        <td class="centerCell">${item.staffNumber}</td>
                        <td><img src="../src/flags/${item.flag}.png"> ${item.nationality}</td>
                        <td>${languageHighlight(item.languages)}</td>
                        <td class="centerCell" style="font-size:smaller;">${item.timeInGrade}</td>
                        <td class="centerCell">${item.ratingIR < 21 ? item.ratingIR < 10 ? `<span class="badge badge-ir" title="Duty free rating" style="padding: 0 0.4rem">${item.ratingIR}</span>` : `<span class="badge badge-ir" title="Duty free rating">${item.ratingIR}</span>` : ""} ${badges(item.badges)}</td>
                        <td class="centerCell">${Object.keys(item.destinationExperience).length > 1 ? JSON.stringify(item.destinationExperience).replaceAll(/[{}"]/g,"").replaceAll(","," ") : item.destinationExperience[Object.keys(item.destinationExperience)[0]]}</td>
                        <td title="${item.comment}">${item.comment.length <= 40 ? item.comment : item.comment.slice(0, 39) + "..."}</td></tr>`;
        lastGrade = item.grade;
    }  
}