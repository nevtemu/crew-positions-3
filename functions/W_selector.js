import {fleet} from '../data/fleet.js';

    /* 
    Priority: 
    1) Crew that user manually selected as W
    2) Gr2 with W badge, 
    3) gr1 as gr2, 
    4) most senior gr2
    */

export function W_selector(crewData, positions) {
    let requiredWcrew = [];
    Object.keys(positions[10].W).forEach((item) => requiredWcrew = [...requiredWcrew, ...positions[10].W[item]]);
    let requiredWcrewLength = requiredWcrew.length;
    // 1)
    const crewWmanualLength = crewData.filter((crew) => crew.grade == "W").length;
    if (crewWmanualLength <= requiredWcrewLength) requiredWcrewLength -= crewWmanualLength;
    else {
        let difference = requiredWcrewLength - crewWmanualLength;
        while (difference < 0) {
            crewData.filter((crew) => crew.grade == "W")[difference].grade = "GR2"
            difference++
        }
    }

    // 2) 
    if (requiredWcrewLength > 0) {
        let crewW = crewData.filter((crew) => crew.grade == "GR2" && crew.badges.includes(170920));
        if (crewW.length > 0) {
            while (requiredWcrewLength > 0) {
                crewW[crewW.length - requiredWcrewLength].grade = "W";
                requiredWcrewLength--;
            }
        }
    }
    // 3)
    if (requiredWcrewLength > 0 && crewData.filter((crew) => crew.grade == "GR2").length < 9) {
        let candidates = crewData.filter((crew) => crew.grade == "GR1");
        let q = candidates.length;
        for (q; q > 8; q--) {
            candidates[q - 1].grade = "W";
            requiredWcrewLength--;
        }
    }
    // 4)
    if (requiredWcrewLength > 0) {
        let candidates = crewData.filter((crew) => crew.grade == "GR2");
        for (let t = 0; t <= requiredWcrewLength; t++) {
            candidates[t].grade = "W";
            requiredWcrewLength--;
        }
    }
}
