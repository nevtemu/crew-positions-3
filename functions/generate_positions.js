import {typesOfAircraft} from '../data/aircraft_type.js';
import {fleet} from '../data/fleet.js';
import {errorHandler} from '../functions/error_handler.js'
import {breaks} from '../data/breaks.js';
import {createLanguageQueues} from '../functions/languages.js';


export function generatePositions(crewData, positions, registration, numberOfDuties = 1, hasBreaks) {
    let languageQueues = createLanguageQueues(crewData)

    for (let i = 0; i < numberOfDuties; i++) {
        let p = structuredClone(positions);

        //Select DF
        let numberOfRetailOperators = typesOfAircraft[fleet[registration]].aircraftModel === "A380" ? 2 : 1;
        let crewsWithRating = crewData.filter((crew) => crew.ratingIR <= 20 && ["FG1", "GR1", "W", "GR2"].includes(crew.grade)).sort((a, b) => a.ratingIR - b.ratingIR);
        if (crewsWithRating.length < numberOfRetailOperators) { // If not enough DF rating crew, add most junior Gr1
            let candidates = crewData.filter((crew) => crew.grade === "GR1" && crew.outOfGrade === false && crew.ratingIR > 20).sort((a, b) => a.timeInGradeNumber - b.timeInGradeNumber);
            while (crewsWithRating.length < numberOfRetailOperators) {
                crewsWithRating.push(candidates.shift());
            }
            if (i === 0 && numberOfRetailOperators === 2) errorHandler("Not enough DF rating crew", "error") // Error shown only for first sector
            else if (i === 0) errorHandler("No DF rating crew", "error")
        }
        while (crewsWithRating.length > numberOfRetailOperators) crewsWithRating.pop(); // Remove extra DF crew (with lowest rating)
        if (numberOfRetailOperators === 2 && crewsWithRating[0].grade === crewsWithRating[1].grade) {// If A380 and both DF crew are same grade add DF position
            if (p[crewsWithRating[0].grade].remain.length > 0) {
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
        ["FG1", "GR1", "W", "GR2"].forEach((grade) => {// Add unused DF positions to remain so they can be used by non-DF crew
            if (grade in p) {
                p[grade].remain = [...p[grade].remain, ...p[grade].df];
                p[grade].df = [];
            }
        });
        //End of DF selector


        //Select PAs
        Object.keys(languageQueues).forEach(lang => {
            let crew = crewData.filter(crew => crew.staffNumber === languageQueues[lang][0])
            if (crew.length > 0) {
                crew[0].doingPA[i] ? crew[0].doingPA[i].push(lang) : crew[0].doingPA[i] = [lang]
            } else {
                errorHandler(`Not enough ${lang} language speakers`, "error")
            }
        })
        //Move the queue
        Object.keys(languageQueues).forEach(lang => {
            languageQueues[lang].push(languageQueues[lang].shift())
        })
        //End of PA selector

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
                            if (i === 1) errorHandler(`No senior crew for galley in grade: ${grade}`, "error");
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
        if (hasBreaks[i]) {
            crewData.forEach((crew) => (crew[`break${i}`] = breaks[fleet[registration]].hasOwnProperty(crew[`position${i}`]) ?
                breaks[fleet[registration]][crew[`position${i}`]] : "")
            );
        }

    }
    return crewData;
}

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;