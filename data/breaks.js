// MFP crew and supervisor should be same break (UL3: 1, MR5: 2), DF crew should be different break
export const breaks = {
  ...Object.fromEntries(
    [10, 11].map((y) => [
      y,
      {
        UL1: 1,
        CSA: 1,
        UL1A: 1,
        UR3: 1,
        ML4A: 1,
        "ML4 (ML4A)": 1,
        MR4A: 1,
        "MR5 (MR4A)": 1,
        UR2: 1,
        ML1: 1,
        MR1: 1,
        MR4: 1,
        ML3: 1,
        ML4: 1,
        PUR: 2,
        MR2A: 2,
        UL3: 2,
        ML3A: 2,
        "ML3 (ML3A)": 2,
        UR1A: 2,
        UL2: 2,
        MR3A: 2,
        "MR2 (MR3A)": 2,
        ML5: 2,
        MR5: 2,
        ML2: 2,
        MR2: 2,
        MR3: 2,
        UR1: 3,
      },
    ])
  ),
  908: {
    UR1: 1,
    CSA: 1,
    UL1A: 1,
    UR3: 1,
    MR1: 1,
    MR2: 1,
    MR4: 1,
    ML3: 1,
    ML4: 1,
    PUR: 2,
    MR2A: 2,
    ML4A: 2,
    "ML4 (ML4A)": 2,
    MR4A: 2,
    "MR5 (MR4A)": 2,
    UR1A: 2,
    UL2: 2,
    UL1: 3,
    ML3A: 3,
    "ML3 (ML3A)": 3,
    UL3: 3,
    UR2: 3,
    ML1: 3,
    ML5: 3,
    ML2: 3,
    MR5: 3,
    MR3: 3,
    MR3A: 2,
    "MR2 (MR3A)": 2,
  },
  904: {
    R1A: 1,
    "R2 (R1A)": 1,
    L1: 1,
    R4: 1,
    L3: 1,
    L2: 1,
    PUR: 2,
    R1: 2,
    L1A: 2,
    "R2 (L1A)": 2,
    "L2 (L1A)": 2,
    L4: 2,
    L4A: 2,
    R3: 2,
    R2: 2,
  },
  4: {
    R1A: 1,
    "R2 (R1A)": 1,
    L1: 1,
    L4: 1,
    R4: 1,
    L3: 1,
    L2: 1,
    PUR: 2,
    R1: 2,
    L1A: 2,
    "R2 (L1A)": 2,
    "L2 (L1A)": 2,
    L4A: 2,
    R3: 2,
    R2: 2,
  },
  ...Object.fromEntries(
    [1, 2, 3, 901].map((x) => [
      x,
      {
        L1: 1,
        R2A: 1,
        "R4 (R2A)": 1,
        R2: 1,
        R5C: 1,
        L3: 1,
        R5: 1,
        L4: 1,
        R1: 2,
        L2A: 2,
        "L4 (L2A)": 2,
        L2: 2,
        L5: 2,
        R3: 2,
        L5A: 2,
        R4: 2,
        PUR: 3,
        L1A: 3,
        "R2 (L1A)": 3,
        "L2 (L1A)": 3,
        "R3 (L1A)": 3,
      },
    ])
  ),
  ...Object.fromEntries(
    [12, 16, 912].map((x) => [
      x,
      {
        L1: 1,
        R2A: 1,
        "R4 (R2A)": 1,
        R2: 1,
        R5C: 1,
        L3: 1,
        R5: 1,
        L4: 1,
        R5A: 1,
        R1: 2,
        L2A: 2,
        "L4 (L2A)": 2,
        L2: 2,
        R3: 2,
        L5: 2,
        L5A: 2,
        R4: 2,
        PUR: 3,
        L1A: 3,
        "R2 (L1A)": 3,
        "L2 (L1A)": 3,
        "R3 (L1A)": 3,
      },
    ])
  ),
  5: {
    L1A: 1,
    "R2 (L1A)": 1,
    "L2 (L1A)": 1,
    R3: 1,
    R2: 1,
    L1: 2,
    L5: 2,
    L5A: 2,
    L4: 2,
    R1: 3,
    R1A: 3,
    "R2 (R1A)": 3,
    R5: 3,
    L3: 3,
    PUR: 4,
    R4: 4,
    L2: 4,
  },
...Object.fromEntries(
    [6, 17].map((n) => [
      n,
      {
    L1: 1,
    R2: 1,
    R5A: 1,
    L4: 1,
    R1: 2,
    R2A: 2,
    "R4 (R2A)": 2,
    R3: 2,
    R5: 2,
    L2A: 3,
    "L4 (L2A)": 3,
    L5: 3,
    L5A: 3,
    PUR: 4,
    L2: 4,
    L3: 4,
    R4: 4,
      },
    ])
  ),
  14: {
    UR1: 1,
    ML3: 1,
    UR1A: 1,
    MR4A: 1,
    "MR5 (MR4A)": 1,
    ML1: 1,
    ML4: 1,
    MR2A: 2,
    UL1A: 2,
    UR3: 2,
    ML4A: 2,
    "ML4 (ML4A)": 2,
    ML2: 2,
    MR4: 2,
    UL1: 3,
    ML3A: 3,
    "ML3 (ML3A)": 3,
    UR2: 3,
    ML5: 3,
    MR5: 3,
    MR3A: 3,
    "MR2 (MR3A)": 3,
    PUR: 4,
    UL3: 4,
    UL2: 4,
    MR1: 4,
    MR2: 4,
    MR3: 4,
    CSA: 0,
  },
  ...Object.fromEntries(
    [9, 15].map((y) => [
      y,
      {
        MR2A: 1,
        CSA: 1,
        UR1A: 1,
        UL3: 1,
        ML3A: 1,
        "ML3 (ML3A)": 1,
        MR1: 1,
        ML5: 1,
        MR2: 1,
        MR5: 1,
        UL1: 2,
        UL1A: 2,
        ML4A: 2,
        "ML4 (ML4A)": 2,
        UR3: 2,
        MR3A: 2,
        "MR2 (MR3A)": 2,
        MR4: 2,
        ML2: 2,
        PUR: 3,
        UR1: 3,
        MR4A: 3,
        "MR5 (MR4A)": 3,
        UR2: 3,
        UL2: 3,
        ML1: 3,
        ML4: 3,
        MR3: 3,
        ML3: 2,
      },
    ])
  ),
};
