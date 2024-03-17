import fleet from '../data/fleet.json' assert { type: "json" };

    /* 
    Priority: 
    1) Gr2 with W badge, 
    2) gr1 as gr2, 
    3) most senior gr2
    */

export function W_selector(crewData, positions) {
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
    if (requiredWcrewLength > 0 && crewData.filter((crew) => crew.grade == "GR2").length < 9) {
        let candidates = crewData.filter((crew) => crew.grade == "GR1");
        let q = candidates.length;
        for (q; q > 8; q--) {
            candidates[q - 1].grade = "W";
            requiredWcrewLength--;
        }
    }
    // 3)
    if (requiredWcrewLength > 0) {
        let candidates = crewData.filter((crew) => crew.grade == "GR2");
        for (let t = 0; t <= requiredWcrewLength; t++) {
            candidates[t].grade = "W";
            requiredWcrewLength--;
        }
    }
}
