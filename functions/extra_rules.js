export function extraRules(thisFlightPositions, variations) {
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