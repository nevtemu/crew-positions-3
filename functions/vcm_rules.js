export function vcmRules(vcm, p, aircraftType, isULR) {
    switch (aircraftType) {
        // B777-300 3 class
        // TO DO: handling of extra Gr1 (R5C)
        case 1:
        case 2:
        case 3:
        case 6:
        case 901:
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
            if (vcm < -3 && isULR) {
                p.FG1.remain.splice(p.FG1.remain.indexOf("L1A"), 1);
                p.GR2.df.splice(p.GR2.df.indexOf("R3"), 1);
                p.FG1.remain.push("R3 (L1A)");
            } else if (vcm < -3) {
                p.FG1.df.splice(p.FG1.df.indexOf("R1"), 1);
                p.GR2.df.splice(p.GR2.df.indexOf("R3"), 1);
                p.PUR.only.splice(p.PUR.only.indexOf("PUR"), 1);
                p.FG1.df.push("R3 (R1)");
                p.PUR.only.push("L1 (PUR)");
            } else break;
            if (vcm < -4 && isULR) {
                p.FG1.df.splice(p.FG1.df.indexOf("R1"), 1);
                p.GR2.galley.splice(p.GR2.galley.indexOf("L3"), 1);
                p.PUR.only.splice(p.PUR.only.indexOf("PUR"), 1);
                p.FG1.df.push("L3 (R1)");
                p.PUR.only.push("L1 (PUR)");
            } else break;
            if (vcm < -5 && isULR || vcm < -4) {
                console.error("Less than minimum crew requirement to operate");
            }
            break;
        // B777-200 2 class
        case 4:
        case 904:
            if (vcm < 0) {
                p.GR2.remain.splice(p.GR2.remain.indexOf("L4A"), 1);
            } else break;
            if (vcm < -1) {
                p.GR1.galley.splice(p.GR1.galley.indexOf("L1A"), 1);
                p.GR2.df.splice(p.GR2.df.indexOf("L2"), 1);
                p.GR1.galley.push("L2 (L1A)");
            } else break;
            if (vcm < -2 && aircraftType === 904) {
                p.CSV.only.splice(p.CSV.only.indexOf("R1A"), 1);
                p.GR2.remain.splice(p.GR2.remain.indexOf("R2"), 1);
                p.CSV.only.push("R2 (R1A)");
            } else if (vcm < -2 && aircraftType === 4) {
                p.GR1.remain.splice(p.GR1.remain.indexOf("R1A"), 1);
                p.GR2.remain.splice(p.GR2.remain.indexOf("R2"), 1);
                p.GR1.remain.push("R2 (R1A)");
            } else break;
            if (vcm < -3) {
                p.GR1.remain.splice(p.GR1.remain.indexOf("L1"), 1);
                p.GR2.remain.splice(p.GR2.remain.indexOf("R3"), 1);
                p.PUR.only.splice(p.PUR.only.indexOf("PUR"), 1);
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
                p.GR1.remain.splice(p.GR1.remain.indexOf("L1"), 1);
                p.GR2.remain.splice(p.GR2.remain.indexOf("R3"), 1);
                p.PUR.only.splice(p.PUR.only.indexOf("PUR"), 1);
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
        case 908:
            if (vcm < 0) {
                p.GR2.remain.splice(p.GR2.remain.indexOf("ML4"), 1);
                p.GR1.df.splice(p.GR1.df.indexOf("ML4A"), 1);
                p.GR1.df.push("ML4 (ML4A)");
            }
            if (vcm < -1) {
                p.GR2.df.splice(p.GR2.df.indexOf("MR5"), 1);
                p.GR1.galley.splice(p.GR1.galley.indexOf("MR4A"), 1);
                p.GR1.galley.push("MR5 (MR4A)");
            } else break;
            if (vcm < -2) {
                p.GR2.remain.splice(p.GR2.remain.indexOf("ML3"), 1);
                p.GR1.galley.splice(p.GR1.galley.indexOf("ML3A"), 1);
                p.GR1.galley.push("ML3 (ML3A)");
            } else break;
            if (vcm < -3 && isULR) {
                p.CSV.only.splice(p.CSV.only.indexOf("ML1"), 1)
                p.PUR.only.splice(p.PUR.only.indexOf("PUR"), 1)
                p.GR2.remain.splice(p.GR2.remain.indexOf("MR1"), 1)
                p.PUR.only.push("ML1 (PUR)")
                p.CSV.only.push("MR1 (ML1)")
            } else if (vcm < -3) {
                p.PUR.only.splice(p.PUR.only.indexOf("PUR"), 1)
                p.GR2.remain.splice(p.GR2.remain.indexOf("ML1"), 1)
                p.PUR.only.push("ML1 (PUR)")
            } else break;
            if (vcm < -4) {
                console.error("Less than minimum crew requirement to operate");
            }
            break;
        // A380-800 2 class
        case 7:
            if (vcm < 0) {
                p.GR2.df.splice(p.GR2.df.indexOf("MR5"), 1);
                p.GR1.galley.splice(p.GR1.galley.indexOf("MR4A"), 1);
                p.GR1.galley.push("MR5 (MR4A)");
            } else break;
            if (vcm < -1) {
                p.GR2.remain.splice(p.GR2.remain.indexOf("ML3"), 1);
                p.GR1.galley.splice(p.GR1.galley.indexOf("ML3A"), 1);
                p.GR1.galley.push("ML3 (ML3A)");
            } else break;
            if (vcm < -2 && isULR) {
                p.CSV.only.splice(p.CSV.only.indexOf("ML1"), 1)
                p.PUR.only.splice(p.PUR.only.indexOf("PUR"), 1)
                p.GR2.remain.splice(p.GR2.remain.indexOf("MR1"), 1)
                p.PUR.only.push("ML1 (PUR)")
                p.CSV.only.push("MR1 (ML1)")
            } else if (vcm < -2) {
                p.PUR.only.splice(p.PUR.only.indexOf("PUR"), 1)
                p.GR2.remain.splice(p.GR2.remain.indexOf("ML1"), 1)
                p.PUR.only.push("ML1 (PUR)")
            } else break;
            if (vcm < -3) {
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
                p.CSV.only.splice(p.CSV.only.indexOf("ML1"), 1)
                p.PUR.only.splice(p.PUR.only.indexOf("PUR"), 1)
                p.GR2.remain.splice(p.GR2.remain.indexOf("MR1"), 1)
                p.PUR.only.push("ML1 (PUR)")
                p.CSV.only.push("MR1 (ML1)")
            } else break;
            if (vcm < -5) {
                console.error("Less than minimum crew requirement to operate");
            }
            break;
        // B773 4 class
        case 12:
        case 16:
        case 912:
            if (vcm < 0) {
                p.GR2.remain.splice(p.GR2.remain.indexOf("L5A"), 1);
            }
            if (vcm < -1) {
                p.GR2.df.splice(p.GR2.remain.indexOf("R5A"), 1);
                p.GR2.remain.splice(p.GR2.remain.indexOf("R4"), 1);
                p.GR2.df.push("R4");
            } else break;
            if (vcm < -2) {
                p.GR1.galley.splice(p.GR1.galley.indexOf("L2A"), 1);
                p.GR2.remain.splice(p.GR2.remain.indexOf("L4"), 1);
                p.GR1.galley.push("L4 (L2A)");
            } else break;
            if (vcm < -3) {
                p.CSV.only.splice(p.CSV.only.indexOf("R2A"), 1);
                p.GR2.df.splice(p.GR2.df.indexOf("R4"), 1);
                p.CSV.only.push("R4 (R2A)");
            } else break;
            if (vcm < -4 && isULR) {
                p.FG1.remain.splice(p.FG1.remain.indexOf("L1A"), 1);
                p.W.df.splice(p.W.df.indexOf("R3"), 1);
                p.FG1.remain.push("R3 (L1A)");
            } else if (vcm < -4) {
                p.FG1.df.splice(p.FG1.df.indexOf("R1"), 1);
                p.W.df.splice(p.W.df.indexOf("R3"), 1);
                p.PUR.only.splice(p.PUR.only.indexOf("PUR"), 1);
                p.FG1.df.push("R3 (R1)");
                p.PUR.only.push("L1 (PUR)");
            } else break;
            if (vcm < -5 && isULR) {
                p.FG1.df.splice(p.FG1.df.indexOf("R1"), 1);
                p.W.galley.splice(p.W.galley.indexOf("L3"), 1);
                p.PUR.only.splice(p.PUR.only.indexOf("PUR"), 1);
                p.FG1.df.push("L3 (R1)");
                p.PUR.only.push("L1 (PUR)");
            } else break;
            if (vcm < -6 && isULR || vcm < -5) {
                console.error("Less than minimum crew requirement to operate");
            }
            break;

        //A350 3 class
        // R5A, L5A, R2A to R3, L1A to L3
        case 13:
            if (vcm < 0) {
                p.GR2.remain.splice(p.GR2.remain.indexOf("R4A"), 1);
            }
            if (vcm < -1) {
                p.GR2.remain.splice(p.GR2.remain.indexOf("L4A"), 1);
            } else break;
            if (vcm < -2) {
                p.GR2.df.splice(p.GR2.df.indexOf("R3"), 1);
                p.GR1.remain.splice(p.GR1.remain.indexOf("R2A"), 1);
                p.GR1.remain.push("R2A (R3)");
            } else break;
            if (vcm < -3) {
                p.GR2.galley.splice(p.GR2.galley.indexOf("L3"), 1);
                p.GR1.galley.splice(p.GR1.galley.indexOf("L1A"), 1);
                p.GR1.galley.push("L1A (L3)");
            } else break;
            if (vcm < -4) {
                console.error("Less than minimum crew requirement to operate");
            }
            break;
        default:
            console.error("Aircraft type not found!");
    }
    return p;
}