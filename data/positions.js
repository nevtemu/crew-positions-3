export const positions = {
    //B777-300 3 class nonULR
    ...Object.fromEntries([1, 2, 3, 6].map((x) => [x, {PUR: {only: ["PUR"]}, CSV: {only: ["L5", "R2A"]}, FG1: {galley: ["L1"], df: ["R1"], remain: []}, GR1: {galley: ["L2A"], df: ["L2"], remain: ["R2"]}, GR2: {galley: ["R5", "L3"], df: ["R3"], remain: ["L4", "R4", "L5A"]}, EXTRA: {only: ["R5A", "R5C"]}}])),
    //B777-300 3 class ULR 
    98: {PUR: {only: ["PUR"]}, CSV: {only: ["L5", "R2A"]}, FG1: {galley: ["L1"], df: ["R1"], remain: ["L1A"]}, GR1: {galley: ["L2A"], df: ["L2"], remain: ["R2"]}, GR2: {galley: ["R5", "L3"], df: ["R3"], remain: ["L4", "R4", "L5A"]}, EXTRA: {only: ["R5A", "R5C"]}},
    //B777-200 2 class ULR/nonULR
    4: {PUR: {only: ["PUR"]}, CSV: {only: ["L4", "R1A"]}, GR1: {galley: ["L1A"], df: ["R1"], remain: ["L1"]}, /*L1A seated at L4C */ GR2: {galley: ["R4", "L3"], df: ["L2"], remain: ["R2", "R3", "L4A"]}, EXTRA: {only: ["R4A", "R4C"]}}, 
    //B777-300 2 class ULR/nonULR
    5: {PUR: {only: ["PUR"]}, CSV: {only: ["L5"]}, GR1: {galley: ["L1A"], df: ["R1"], remain: ["L1", "R1A"]}, /* L1A seated at at R5A */ GR2: {galley: ["R5", "L3"], df: ["L2"], remain: ["L4", "R4", "R3", "R2", "L5A"]}, EXTRA: {only: ["R5A", "R5C"]}}, 
    //A380-800 2 class ULR/nonULR
    7: {PUR: {only: ["PUR"]}, CSV: {only: ["ML5", "UL1A", "ML1"]}, GR1: {galley: ["ML3A", "MR4A"], df: ["UL3"], remain: ["UR3" /* Back up DF position */, "UR2", "UL2", "UR1A"]}, GR2: {galley: ["UC1", "ML2", "MR4"], df: ["MR5"], remain: ["UR1" /* Back up DF position */, "UL1", "MR1", "ML3", "ML4", "MR3", "MR2"]}, EXTRA: {only: ["MR3A", "MR2A", "ML4A", "ML2A"]}}, 
    //A380-800 3 class nonULR
    ...Object.fromEntries([8, 9, 11, 12].map((y) => [y, {/* 9 Gr2s on remain deck */PUR: {only: ["PUR"]}, CSV: {only: ["ML5", "UL1A"]}, FG1: {galley: ["MR2A"], df: ["UR1"], remain: ["UL1"]}, GR1: {galley: ["ML3A", "MR4A"], df: ["UL3"], remain: ["ML4A" /* Back up DF position */, "UR2", "UR3", "UL2", "UR1A"]}, GR2: {galley: ["ML2", "MR4"], df: ["MR5"], remain: ["MR1" /* Back up DF position */, "ML1", "ML3", "ML4", "MR3", "MR2"]}, CSA: {only: ["CSA"]}, /* sits at ML2A */ EXTRA: {only: ["MR3A"]}}])), 
    //A380-800 3 class ULR
    99: {/* On ULR 2 CSV in YC */ PUR: {only: ["PUR"]}, CSV: {only: ["ML5", "UL1A", "ML1"]}, FG1: {galley: ["MR2A"], df: ["UR1"], remain: ["UL1"]}, GR1: {galley: ["ML3A", "MR4A"], df: ["UL3"], remain: ["ML4A" /* Back up DF position */, "UR2", "UR3", "UL2", "UR1A"]}, GR2: {galley: ["ML2", "MR4"], df: ["MR5"], remain: ["MR1" /* Back up DF position */, "ML3", "ML4", "MR3", "MR2"]}, CSA: {only: ["CSA"]}, /* sits at ML2A */ EXTRA: {only: ["MR3A"]}}, 
    //A380-800 4 class ULR/nonULR
    10: {PUR: {only: ["PUR"]}, CSV: {only: ["ML5", "UL1A", "ML1"]}, FG1: {galley: ["MR2A"], df: ["UR1"], remain: ["UL1"]}, GR1: {galley: ["ML3A", "MR4A"], df: ["UL3"], remain: ["ML4A" /* Back up DF position */, "UR2", "UR3", "UL2", "UR1A"]}, GR2: {galley: ["ML2", "MR4"], df: ["MR5"], remain: ["MR2" /* Back up DF position */, "ML4", "MR3", "ML3"]}, W: {galley: ["MR3A"], df: [], remain: ["MR1"]}, CSA: {only: ["CSA"]}, /* sits at ML2A */ EXTRA: {only: []}},
    //B773 4 class nonULR
    12: {PUR: {only: ["PUR"]}, CSV: {only: ["L5", "R2A"]}, FG1: {galley: ["L1"], df: ["R1"], remain: []}, GR1: {galley: ["L2A"], df: ["L2"], remain: ["R2"]}, W: {galley: ["L3"], df: ["R3"], remain: []}, GR2: {galley: ["R5"], df: ["R5A"], remain: ["L4", "R4", "L5A"]}, EXTRA: {only: ["R5C"]}},
    // //B773 4 class ULR
    97: {PUR: {only: ["PUR"]}, CSV: {only: ["L5", "R2A"]}, FG1: {galley: ["L1"], df: ["R1"], remain: ["l1A"] /* Seated at R5C? */ }, GR1: {galley: ["L2A"], df: ["L2"], remain: ["R2"]}, W: {galley: ["L3"], df: ["R3"], remain: []}, GR2: {galley: ["R5"], df: ["R5A"], remain: ["L4", "R4", "L5A"]}, EXTRA: {only: []}},
    // //A350
    // 13: {PUR: {only: ["PUR"]}, CSV: {only: ["L5", "R2A"]}, FG1: {galley: ["L1"], df: ["R1"], remain: []}, GR1: {galley: ["L2A"], df: ["L2"], remain: ["R2"]}, W: {galley: [], df: [], remain: []}, GR2: {galley: ["R5", "L3"], df: ["R3"], remain: ["L4", "R4", "L5A"]}, EXTRA: {only: ["R5A", "R5C"]}}
};

//U2 do inboard seats, U3 do window seats