const typesOfAircraft = {
  1: {typesOfAircraftIndex: 1, crc: 1, aircraftModel: "B773", classes: 3, description: "B773 3 class", fullDescription: "B773 3 class (with CRC)"}, 
  2: {typesOfAircraftIndex: 2, crc: 1, aircraftModel: "B773", classes: 3, description: "B773 3 class (JC Falcon seats)", fullDescription: "B773 3 class (with CRC, JC Falcon seats)"}, 
  3: {typesOfAircraftIndex: 3, crc: 1, aircraftModel: "B773", classes: 3, description: "B773 3 class (Game changer)", fullDescription: "B773 3 class (with CRC, Game changer)"}, 
  4: {typesOfAircraftIndex: 4, crc: 1, aircraftModel: "B772", classes: 2, description: "B772 2 class (JC Falcon seats)", fullDescription: "B772 2 class (with CRC, JC Falcon seats)"}, 
  5: {typesOfAircraftIndex: 5, crc: -1, aircraftModel: "B773", classes: 2, description: "B773 2 class", fullDescription: "B773 2 class (no CRC)"}, 
  6: {typesOfAircraftIndex: 6, crc: -1, aircraftModel: "B773", classes: 3, description: "B773 3 class", fullDescription: "B773 3 class (no CRC)"},
  7: {typesOfAircraftIndex: 7, crc: -1, aircraftModel: "A380", classes: 2, description: "A380 2 class", fullDescription: "A380 2 class (no CRC)"}, 
  8: {typesOfAircraftIndex: 8, crc: -1, aircraftModel: "A380", classes: 3, description: "A380 3 class", fullDescription: "A380 3 class (no CRC)"}, 
  9: {typesOfAircraftIndex: 9, crc: 3, aircraftModel: "A380", classes: 3, description: "A380 3 class", fullDescription: "A380 3 class (with MD-CRC)"}, 
  10: {typesOfAircraftIndex: 10, crc: 2, aircraftModel: "A380", classes: 4, description: "A380 4 class", fullDescription: "A380 4 class (with LD-CRC)"}, 
  11: {typesOfAircraftIndex: 11, crc: 2, aircraftModel: "A380", classes: 3, description: "A380 3 class", fullDescription: "A380 3 class (with LD-CRC)"}, 
  12: {typesOfAircraftIndex: 12, crc: 2, aircraftModel: "A380", classes: 3, description: "A380 3 class (New lounge)", fullDescription: "A380 3 class (with LD-CRC, New lounge)"} //seems like all of these are retrofitted into 4 class A380 (type 10 in my script)
};

const fleet = {A6EBQ: 1, A6EBR: 1, A6EBU: 1, A6EBW: 1, A6EBY: 1, A6ECA: 1, A6ECC: 1, A6ECD: 1, A6ECE: 1, A6ECF: 1, A6ECG: 1, A6ECH: 1, A6ECI: 1, A6ECJ: 1, A6ECK: 1, A6ECM: 1, A6ECO: 1, A6ECQ: 1, A6ECR: 1, A6ECS: 1, A6ECT: 1, A6ECU: 1, A6ECV: 1, A6ECW: 1, A6ECX: 1, A6EGA: 1, A6EGB: 1, A6EGC: 1, A6EGE: 1, A6EGF: 1, A6EGH: 1, A6EGI: 1, A6EPV: 2, A6EPW: 2, A6EPX: 2, A6EPY: 2, A6EPZ: 2, A6EQA: 2, A6EQB: 2, A6EQC: 2, A6EQD: 2, A6EQE: 2, A6EQF: 2, A6EQG: 2, A6EQH: 3, A6EQI: 3, A6EQJ: 3, A6EQK: 3, A6EQL: 3, A6EQM: 3, A6EQN: 3, A6EQO: 3, A6EQP: 3, A6EWA: 4, A6EWB: 4, A6EWC: 4, A6EWD: 4, A6EWE: 4, A6EWF: 4, A6EWG: 4, A6EWH: 4, A6EWI: 4, A6EWJ: 4, A6ECY: 5, A6ECZ: 5, A6ENA: 5, A6ENB: 5, A6ENC: 5, A6END: 5, A6ENF: 5, A6ENH: 5, A6ENI: 5, A6ENO: 5, A6ENW: 5, A6ENY: 5, A6EPE: 5, A6EPG: 5, A6EPQ: 5, A6EPR: 5, A6EPT: 5, A6EBK: 6, A6EBM: 6, A6EGD: 6, A6EGG: 6, A6EGK: 6, A6EGP: 6, A6EGJ: 6, A6EGL: 6, A6EGM: 6, A6EGN: 6, A6EGO: 6, A6EGQ: 6, A6EGR: 6, A6EGS: 6, A6EGT: 6, A6EGV: 6, A6EGX: 6, A6EGY: 6, A6EGZ: 6, A6ENE: 6, A6ENG: 6, A6ENJ: 6, A6ENK: 6, A6ENL: 6, A6ENM: 6, A6ENN: 6, A6ENP: 6, A6ENQ: 6, A6ENR: 6, A6ENS: 6, A6ENT: 6, A6ENU: 6, A6ENV: 6, A6ENX: 6, A6ENZ: 6, A6EPA: 6, A6EPB: 6, A6EPC: 6, A6EPD: 6, A6EPF: 6, A6EPH: 6, A6EPI: 6, A6EPJ: 6, A6EPK: 6, A6EPL: 6, A6EPM: 6, A6EPN: 6, A6EPO: 6, A6EPS: 6, A6EPU: 6, A6EOP: 7, A6EOQ: 7, A6EOR: 7, A6EOS: 7, A6EOX: 7, A6EOY: 7, A6EUN: 7, A6EUO: 7, A6EUP: 7, A6EUQ: 7, A6EUX: 7, A6EUY: 7, A6EUZ: 7, A6EVA: 7, A6EVB: 7, A6EDF: 8, A6EDG: 8, A6EDH: 8, A6EDI: 8, A6EDJ: 8, A6EDK: 8, A6EDL: 8, A6EDQ: 8, A6EDR: 8, A6EDS: 8, A6EDT: 8, A6EDU: 8, A6EDV: 8, A6EDW: 8, A6EDX: 8, A6EEA: 8, A6EEB: 8, A6EEC: 8, A6EED: 8, A6EEE: 8, A6EEI: 8, A6EEJ: 8, A6EEN: 8, A6EER: 8, A6EES: 8, A6EEW: 8, A6EEX: 8, A6EEY: 8, A6EEZ: 8, A6EOA: 8, A6EOB: 8, A6EOI: 8, A6EOJ: 8, A6EOK: 8, A6EOO: 8, A6EOT: 8, A6EOU: 8, A6EOV: 8, A6EOW: 8, A6EOZ: 8, A6EUA: 8, A6EUB: 8, A6EUC: 8, A6EUD: 8, A6EUM: 8, A6EDC: 9, A6EDD: 9, A6EDE: 9, A6EDM: 9, A6EDN: 9, A6EDO: 9, A6EDP: 9, A6EDY: 9, A6EDZ: 9, A6EEF: 9, A6EEG: 9, A6EEH: 9, A6EEK: 9, A6EEL: 9, A6EEM: 9, A6EEO: 9, A6EEP: 9, A6EEQ: 9, A6EET: 9, A6EEU: 9, A6EEV: 9, A6EOC: 9, A6EOD: 9, A6EOE: 9, A6EOF: 9, A6EOG: 9, A6EOH: 9, A6EOL: 9, A6EOM: 9, A6EON: 9, A6EUS: 10, A6EUU: 10, A6EUV: 10, A6EUW: 10, A6EVC: 10, A6EVD: 10, A6EVE: 10, A6EVF: 10, A6EVG: 10, A6EVH: 10, A6EVI: 10, A6EVJ: 10, A6EVK: 10, A6EVL: 10, A6EVM: 10, A6EVN: 10, A6EVO: 10, A6EVP: 10, A6EVQ: 10, A6EVR: 10, A6EVS: 10, A6EUE: 11, A6EUF: 11, A6EUG: 11, A6EUH: 11, A6EUI: 11, A6EUJ: 11, A6EUK: 11, A6EUL: 11, A6EUR: 11, A6EUT: 11};
const fleetAge = {A6EDE:'04/24/2009',A6EDM:'09/28/2010',A6EDO:'11/30/2010',A6EDQ:'10/28/2011',A6EDS:'12/16/2011',A6EDU:'02/24/2012',A6EDV:'07/30/2012',A6EDY:'10/01/2012',A6EDZ:'10/12/2012',A6EEA:'12/19/2012',A6EEB:'11/09/2012',A6EEC:'11/30/2012',A6EED:'12/28/2012',A6EEE:'12/27/2012',A6EEF:'05/03/2013',A6EEG:'05/08/2013',A6EEH:'06/04/2013',A6EEI:'06/17/2013',A6EEJ:'09/19/2013',A6EEK:'08/29/2013',A6EEL:'11/27/2013',A6EEM:'11/14/2013',A6EEN:'11/27/2013',A6EEP:'12/12/2013',A6EER:'12/19/2013',A6EES:'12/19/2013',A6EEQ:'02/14/2014',A6EEU:'03/27/2014',A6EEV:'05/19/2014',A6EEW:'06/27/2014',A6EEX:'07/09/2014',A6EEY:'09/04/2014',A6EEZ:'08/22/2014',A6EOA:'09/26/2014',A6EVB:'11/16/2018',A6EOB:'11/07/2014',A6EOC:'11/26/2014',A6EVA:'04/26/2018',A6EOD:'12/10/2014',A6EOE:'12/22/2014',A6EOF:'01/30/2015',A6EOG:'03/05/2015',A6EOH:'04/17/2015',A6EOI:'05/18/2015',A6EOJ:'06/09/2015',A6EOK:'07/14/2015',A6EOL:'07/16/2015',A6EOM:'08/03/2015',A6EON:'09/01/2015',A6EOO:'08/19/2015',A6EOQ:'11/28/2015',A6EOR:'12/03/2015',A6EOT:'12/24/2015',A6EOU:'01/26/2016',A6EOV:'02/19/2016',A6EOW:'03/25/2016',A6EOX:'04/13/2016',A6EOY:'04/22/2016',A6EOZ:'05/20/2016',A6EUA:'06/02/2016',A6EUB:'06/23/2016',A6EUC:'09/10/2016',A6EUD:'06/30/2016',A6EUE:'08/19/2016',A6EUF:'10/05/2016',A6EUG:'10/25/2016',A6EUH:'11/19/2016',A6EUI:'02/21/2017',A6EUJ:'11/30/2016',A6EUK:'12/09/2016',A6EUL:'12/20/2016',A6EUM:'12/29/2016',A6EUN:'12/29/2016',A6EUO:'12/29/2016',A6EUP:'03/25/2017',A6EUQ:'05/15/2017',A6EUR:'03/16/2018',A6EUS:'11/30/2017',A6EUT:'10/27/2017',A6EUU:'07/01/2018',A6EUV:'11/06/2017',A6EUW:'09/17/2018',A6EUX:'07/27/2017',A6EUY:'08/29/2017',A6EVC:'05/11/2019',A6EVD:'07/19/2019',A6EVE:'11/28/2018',A6EVF:'12/07/2018',A6EVG:'06/18/2019',A6EVH:'12/14/2018',A6EVI:'12/12/2019',A6EVJ:'11/08/2019',A6EVK:'12/20/2019',A6EVL:'12/04/2020',A6EVM:'12/11/2020',A6EVN:'12/23/2020',A6EVO:'06/18/2021',A6EVP:'05/12/2021',A6EVQ:'10/07/2021',A6EVR:'12/10/2021',A6EVS:'12/16/2021',A6EBW:'11/29/2006',A6ECA:'06/21/2007',A6ECD:'10/27/2007',A6EBQ:'08/05/2006',A6EBY:'03/30/2007',A6ECC:'10/03/2007',A6EBK:'02/15/2006',A6EBM:'03/18/2006',A6EBR:'08/30/2006',A6EBU:'10/24/2006',A6EWA:'08/31/2007',A6EWB:'09/20/2007',A6ECF:'01/29/2008',A6ECE:'12/20/2007',A6EWC:'11/19/2007',A6EWD:'01/25/2008',A6EWG:'11/10/2008',A6ECG:'04/22/2008',A6ECI:'07/25/2008',A6ECH:'05/09/2008',A6EWE:'06/30/2008',A6ECJ:'08/28/2008',A6ECK:'12/10/2008',A6EGH:'10/21/2011',A6EWF:'08/28/2008',A6ECQ:'04/30/2009',A6EWI:'01/26/2009',A6EWJ:'03/30/2009',A6ECT:'08/26/2009',A6ECR:'06/26/2009',A6ECU:'09/29/2009',A6ECV:'10/29/2009',A6ECY:'01/27/2010',A6EGC:'07/14/2011',A6EGE:'08/05/2011',A6EGO:'03/20/2012',A6EGP:'05/08/2012',A6EGT:'06/29/2012',A6EGW:'08/10/2012',A6EGX:'08/31/2012',A6ENE:'01/23/2013',A6ENG:'02/19/2013',A6ENJ:'05/17/2013',A6EFH:'09/28/2012',A6EFI:'11/29/2012',A6EFJ:'12/19/2012',A6EFK:'03/28/2013',A6ECM:'01/22/2009',A6ECO:'02/26/2009',A6ECS:'07/29/2009',A6ECW:'11/17/2009',A6ECX:'11/25/2009',A6ECZ:'02/11/2010',A6EGA:'04/14/2010',A6EGB:'05/05/2011',A6EGI:'11/10/2011',A6EGF:'09/20/2011',A6EGD:'07/18/2011',A6EGJ:'12/08/2011',A6EGV:'07/31/2012',A6ENK:'07/25/2013',A6EGG:'10/11/2011',A6EGK:'12/15/2011',A6EGL:'12/29/2011',A6EGM:'01/24/2012',A6EGN:'02/29/2012',A6ENB:'11/16/2012',A6EGQ:'05/16/2012',A6EGR:'05/30/2012',A6EGS:'06/11/2012',A6EGU:'07/13/2012',A6EGY:'09/05/2012',A6EGZ:'10/01/2012',A6ENA:'10/16/2012',A6ENC:'11/30/2012',A6END:'12/14/2012',A6ENF:'01/31/2013',A6ENH:'03/01/2013',A6ENI:'03/26/2013',A6ENM:'01/24/2014',A6ENN:'02/21/2014',A6ENO:'03/19/2014',A6ENP:'04/24/2014',A6ENQ:'05/27/2014',A6ENR:'06/11/2014',A6ENS:'07/29/2014',A6ENT:'08/15/2014',A6ENU:'09/29/2014',A6ENV:'10/28/2014',A6ENW:'11/13/2014',A6ENL:'08/30/2013',A6ENY:'03/03/2015',A6EFL:'09/20/2013',A6EFM:'10/18/2013',A6EFN:'06/26/2014',A6EFO:'10/31/2014',A6EFS:'09/02/2015',A6ENX:'12/19/2014',A6ENZ:'04/14/2015',A6EPA:'08/31/2015',A6EPB:'08/31/2015',A6EPC:'09/30/2015',A6EPD:'10/19/2015',A6EPE:'11/25/2015',A6EPF:'11/21/2015',A6EPG:'12/11/2015',A6EPH:'12/18/2015',A6EPI:'01/15/2016',A6EPJ:'02/12/2016',A6EPK:'03/16/2016',A6EPL:'04/15/2016',A6EPM:'05/20/2016',A6EPN:'06/30/2016',A6EPO:'07/28/2016',A6EPP:'07/29/2016',A6EPQ:'08/19/2016',A6EPR:'09/23/2016',A6EPS:'09/29/2016',A6EPT:'10/17/2016',A6EPU:'11/04/2016',A6EPV:'12/19/2016',A6EPW:'12/21/2016',A6EPX:'12/23/2016',A6EPY:'02/10/2017',A6EPZ:'03/31/2017',A6EQA:'03/31/2017',A6EQB:'05/30/2017',A6EQC:'06/12/2017',A6EQD:'06/23/2017',A6EQE:'08/18/2017',A6EQF:'08/30/2017',A6EQG:'09/28/2017',A6EQH:'11/03/2017',A6EQI:'11/30/2017',A6EQJ:'12/30/2017',A6EQK:'05/07/2018',A6EQL:'06/14/2018',A6EQM:'06/30/2018',A6EQN:'08/03/2018',A6EQP:'11/30/2018',A6EQO:'09/28/2018',A6EFT:'05/26/2022',A6EFU:'06/30/2022'}

// MFP crew and supervisor should be same break (UL3: 1, MR5: 2), DF crew should be different break
// const breaks = {
//   ...Object.fromEntries([1, 2, 3].map((x) => [x, {/*Fg1 3 groups */ L1: 1, R1: 2, PUR: 3, /* Group 1 */ R2A: 1, "R4 (R2A)": 1, L2A: 1, "L4 (L2A)": 1, L3: 1, R5: 1, L4: 1, /* Group 2 */ L2: 2, R2: 2, L5: 2, R4: 2, R3: 2, L5A: 2}])), 
//   4: {/* Group 1 */ R1A: 1, "R2 (R1A)": 1, L1A: 1, "L2 (L1A)": 1, R4: 1, R2: 1, L3: 1, /* Group 2 */ PUR: 2, L1: 2, "R3 (L1)": 2, R1: 2, L4: 2, L2: 2, R3: 2, L4A: 2}, 
//   5: {/* Group 1 */ L1A: 1, "L2 (L1A)": 1, L4: 1, R2: 1, /* Group 2 */ R1A: 2, "R2 (R1A)": 2, L5: 2, R5: 2, L5A: 2, /* Group 3 */ R1: 3, L3: 3, L2: 3, /* Group 4 */ PUR: 4, L1: 4, "R3 (L1)": 4, R4: 4, R3: 4}, 
//   6: {/* Group 1 */ L1: 1, L2A: 1, "L4 (L2A)": 1, L5A: 1, R5: 1, /* Group 2 */ R1: 2, R2A: 2, "R4 (R2A)": 2, L4: 2, L3: 2, /* Group 3 */ R2: 3, L5: 3, R4: 3, /* Group 4 */ PUR: 4, L2: 4, R3: 3}, 
//   7: {/* Group 1 */ ML1: 1, "MR1 (ML1)": 1, ML3A: 1, "ML3 (ML3A)": 1, UL1A: 1, ML2: 1, MR4: 1, /* Group 2 */ UL1A: 2, UL3: 2, MR1: 2, MR5: 2, UC1: 2, /* Group 3 */ ML5: 3, UL2: 3, UR3: 3, UR1: 3, MR2: 3, MR3: 3, /* Group 4 */ PUR: 4, UR2: 4, UL1: 4, ML3: 4, ML4: 4}, 
//   8: {/* Group 1 */ UL1: 1, ML3A: 1, "ML3 (ML3A)": 1, UL1A: 1, ML2: 1, MR4: 1, CSA: 1, /* Group 2 */ MR2A: 2, UL1A: 2, MR4A: 2, "MR5 (MR4A)": 2, UL3: 2, MR1: 2, MR5: 2, /* Group 3 */ UR1: 3, ML5: 3, UR3: 3, UL2: 3, ML3: 3, MR3: 3, /* Group 4 */ PUR: 4, ML1: 4, "MR1 (ML1)": 4, ML4A: 4, "ML4 (ML4A)": 4, UR2: 4, MR2: 4, ML4: 4}, 
//   9: {/* Group 1 */ UL1: 1, UL1A: 1, ML3A: 1, "ML3 (ML3A)": 1, ML5: 1, MR1: 1, ML2: 1, MR4: 1, ML4: 1, CSA: 1, /* Group 2 */ PUR: 2, MR2A: 2, UR2: 2, UR1A: 2, UL2: 2, ML4A: 2, "ML4 (ML4A)": 2, /* Group 3 */ UR1: 3, MR4A: 3, "MR5 (MR4A)": 3, UR3: 3, UL3: 3, ML1: 3, "MR1 (ML1)": 3, MR2: 3, ML3: 3, MR5: 3, MR3: 3}, 
//   ...Object.fromEntries([10, 11, 12].map((y) => [y, {/*Fg1 3 groups */ UL1: 1, MR2A: 2, UR1: 3, /* Group 1 */ UL1A: 1, UL2: 1, ML3A: 1, "ML3 (ML3A)": 1, UR3: 1, UR1A: 1, ML1: 1, "MR1 (ML1)": 1, MR1: 1, ML2: 1, MR4: 1, ML4: 1, CSA: 1, /* Group 2 */ PUR: 2, MR4A: 2, "MR5 (MR4A)": 2, ML4A: 2, "ML4 (ML4A)": 2, UR2: 2, UL3: 2, MR3A: 2, "MR2 (MR3A)": 2, ML5: 2, MR2: 2, ML3: 2, MR5: 2, MR3: 2}])), //Same for all A380 with LD-CRC (3 and 4 class)
//   99: {/* Group 1 */ UL1: 1, UL1A: 1, ML3A: 1, "ML3 (ML3A)": 1, MR4A: 3, "MR5 (MR4A)": 3, ML5: 1, MR1: 1, ML2: 1, ML4: 1, CSA: 1, /* Group 2 */ MR2A: 2, UR3: 2, UR1A: 2, UL2: 2, ML3: 3, MR2: 3, MR4: 1, /* Group 3 */ PUR: 3, UR1: 3, ML4A: 2, "ML4 (ML4A)": 2, UR2: 3, UL3: 3, ML1: 3, "MR1 (ML1)": 3, MR5: 3, MR3: 3} //A380 LR MD-CRC breaks different from A380 ULR MD-CRC (huge difference!)
// };
const breaks = {
  ...Object.fromEntries([1, 2, 3].map((x) => [x, {'L1':1,'R2A':1,'R4 (R2A)':1,'R2':1,'L3':1,'R5':1,'L4':1,'R1':2,'L2A':2,'L4 (L2A)':2,'L2':2,'L5':2,'R3':2,'L5A':2,'R4':2,'PUR':3}])),
  4:{'R1A':1,'R2 (R1A)':1,'R1':1,'R4':1,'R3':1,'L2':1,'PUR':2,'L1':2,'L1A':2,'R2 (L1A)':2,'L2 (L1A)':2,'L4':2,'L4A':2,'L3':2,'R2':2},
  5:{'L1A':1,'R2 (L1A)':1,'L2 (L1A)':1,'R3':1,'R2':1,'L1':2,'L5':2,'L5A':2,'L4':2,'R1':3,'R1A':3,'R2 (R1A)':3,'R5':3,'L3':3,'PUR':4,'R4':4,'L2':4},
  6:{'L1':1,'R2':1,'R3':1,'L4':1,'R1':2,'R2A':2,'R4 (R2A)':2,'L3':2,'R5':2,'L2A':3,'L4 (L2A)':3,'L5':3,'L5A':3,'PUR':4,'L2':4,'R4':4},
  7:{'UR1A':1,'UR2':1,'ML1':1,'MR2':1,'MR3':1,'UL1A':2,'UR3':2,'MR4':2,'UC1':2,'ML2':2,'UL3':3,'ML3A':3,'ML3 (ML3A)':3,'ML5':3,'MR1':3,'UL1':3,'MR5':3,'PUR':4,'UL2':4,'UR1':4,'ML3':4,'ML4':4},
  8:{'UR1':1,'CSA':1,'UR1A':1,'MR4A':1,'MR5 (MR4A)':1,'ML1':1,'ML4':1,'MR2A':2,'UL1A':2,'UL3':2,'ML4A':2,'ML4 (ML4A)':2,'ML3':2,'MR4':2,'UL1':3,'ML3A':3,'ML3 (ML3A)':3,'UR2':3,'ML5':3,'MR5':3,'ML2':3,'PUR':4,'UR3':4,'UL2':4,'MR1':4,'MR2':4,'MR3':4},
  9:{'MR2A':1,'CSA':1,'UR1A':1,'UR3':1,'MR4A':1,'MR5 (MR4A)':1,'ML5':1,'MR5':1,'MR2':1,'ML3':1,'UR1':2,'UL1A':2,'ML3A':2,'ML3 (ML3A)':2,'UL3':2,'ML2':2,'MR4':2,'ML1':2,'PUR':3,'UL1':3,'ML4A':3,'ML4 (ML4A)':3,'UR2':3,'UL2':3,'MR3':3,'ML4':3,'MR1':3},
  ...Object.fromEntries([10, 11, 12].map((y) => [y, {'UL1':1,'CSA':1,'UL1A':1,'UL3':1,'ML4A':1,'ML4 (ML4A)':1,'MR4A':1,'MR5 (MR4A)':1,'UR2':1,'ML1':1,'MR1':1,'MR4':1,'ML3':1,'ML4':1,'PUR':2,'MR2A':2,'UR3':2,'ML3A':2,'ML3 (ML3A)':2,'UR1A':2,'UL2':2,'MR3A':2,'MR2 (MR3A)':2,'ML5':2,'MR5':2,'ML2':2,'MR2':2,'MR3':2,'UR1':3}])),
  99:{'UR1':1,'CSA':1,'UL1A':1,'UL3':1,'ML1':1,'MR1':1,'MR4':1,'ML3':1,'ML4':1,'PUR':2,'MR2A':2,'ML4A':2,'ML4 (ML4A)':2,'MR4A':2,'MR5 (MR4A)':2,'UR1A':2,'UL2':2,'UL1':3,'ML3A':3,'ML3 (ML3A)':3,'UR3':3,'UR2':3,'ML5':3,'MR5':3,'ML2':3,'MR2':3,'MR3':3}
  }	

const positions = {
  //B777-300 3 class ULR/nonULR
  ...Object.fromEntries([1, 2, 3, 6].map((x) => [x, {PUR: {only: ["PUR"]}, CSV: {only: ["L5", "R2A"]}, FG1: {galley: ["L1"], df: ["R1"], remain: []}, GR1: {galley: ["L2A"], df: ["L2"], remain: ["R2"]}, GR2: {galley: ["R5", "L3"], df: ["R3"], remain: ["L4", "R4", "L5A"]}, EXTRA: {only: ["R5A", "R5C"]}}])), 
  //B777-200 2 class ULR/nonULR
  4: {PUR: {only: ["PUR"]}, CSV: {only: ["L4", "R1A"]}, GR1: {galley: ["L1A"], df: ["R1"], remain: ["L1"]}, /*L1A seated at L4C */ GR2: {galley: ["R4", "L3"], df: ["L2"], remain: ["R2", "R3", "L4A"]}, EXTRA: {only: ["R4A", "R4C"]}}, 
  //B777-300 2 class ULR/nonULR
  5: {PUR: {only: ["PUR"]}, CSV: {only: ["L5"]}, GR1: {galley: ["L1A"], df: ["R1A"], remain: ["L1", "R1"]}, /* L1A seated at at R5A */ GR2: {galley: ["R5", "L3"], df: ["L2"], remain: ["L4", "R4", "R3", "R2", "L5A"]}, EXTRA: {only: ["R5A", "R5C"]}}, 
  //A380-800 2 class ULR/nonULR
  7: {PUR: {only: ["PUR"]}, CSV: {only: ["ML5", "UL1A", "ML1"]}, GR1: {galley: ["ML3A"], df: ["UR3"], remain: ["UL3" /* Back up DF position */, "UR2", "UL2", "UR1A"]}, GR2: {galley: ["UC1", "ML2", "MR4"], df: ["MR5"], remain: ["UR1" /* Back up DF position */, "UL1", "MR1", "ML3", "ML4", "MR3", "MR2"]}, EXTRA: {only: ["MR3A", "MR2A", "ML4A", "MR4A", "ML2A"]}}, 
  //A380-800 3 class nonULR
  ...Object.fromEntries([8, 9, 11, 12].map((y) => [y, {/* 9 Gr2s on remain deck */PUR: {only: ["PUR"]}, CSV: {only: ["ML5", "UL1A"]}, FG1: {galley: ["MR2A"], df: ["UR1"], remain: ["UL1"]}, GR1: {galley: ["ML3A", "MR4A"], df: ["ML4A"], remain: ["UR3" /* Back up DF position */, "UR2", "UL3", "UL2", "UR1A"]}, GR2: {galley: ["ML2", "MR4"], df: ["MR5"], remain: ["MR1" /* Back up DF position */, "ML1", "ML3", "ML4", "MR3", "MR2"]}, CSA: {only: ["CSA"]}, /* sits at ML2A */ EXTRA: {only: ["MR3A"]}}])), 
  //A380-800 3 class ULR
  99: {/* On ULR 2 CSV in YC */ PUR: {only: ["PUR"]}, CSV: {only: ["ML5", "UL1A", "ML1"]}, FG1: {galley: ["MR2A"], df: ["UR1"], remain: ["UL1"]}, GR1: {galley: ["ML3A", "MR4A"], df: ["ML4A"], remain: ["UR3" /* Back up DF position */, "UR2", "UL3", "UL2", "UR1A"]}, GR2: {galley: ["ML2", "MR4"], df: ["MR5"], remain: ["MR1" /* Back up DF position */, "ML3", "ML4", "MR3", "MR2"]}, CSA: {only: ["CSA"]}, /* sits at ML2A */ EXTRA: {only: ["MR3A"]}}, 
  //A380-800 4 class ULR/nonULR
  10: {PUR: {only: ["PUR"]}, CSV: {only: ["ML5", "UL1A", "ML1"]}, FG1: {galley: ["MR2A"], df: ["UR1"], remain: ["UL1"]}, GR1: {galley: ["ML3A", "MR4A"], df: ["ML4A"], remain: ["UR3" /* Back up DF position */, "UR2", "UL3", "UL2", "UR1A"]}, GR2: {galley: ["ML2", "MR4"], df: ["MR5"], remain: ["MR2" /* Back up DF position */, "ML4", "MR3", "ML3"]}, W: {galley: ["MR3A"], df: [], remain: ["MR1"]}, CSA: {only: ["CSA"]}, /* sits at ML2A */ EXTRA: {only: []}}};

const qualifications = {
  DFratings: {92086: 1, 93963: 2, 95840: 3, 97717: 4, 99594: 5, 101471: 6, 103348: 7, 105225: 8, 107102: 9, 108979: 10, 110856: 11, 112733: 12, 114610: 13, 118364: 14, 120241: 15, 122118: 16, 123995: 17, 125872: 18, 127749: 19, 129626: 20}, 
  important: {1: "Birthday" /* I added this qualification ID */, 12: "PTT - SEP", 14: "PTT - GMT", 16: "PTT - Image & Uniform", 17: "PTT - Service Training", 18: "PTT - Leadership", 20: "Business Promotions Crew", 21: "Dubai Airwing Crew", 23: "PTT - Security", 24: "PUR Pool", 25: "SFS Pool", 27: "PTT - Service Personality", 30: "PTT - Induction", 102: "Peer Support", 24514: "Relocatted ID", 142765: "Negative PCR is Required", 170920: "Premium Economy crew"}, 
  languages: {33: "Afrikaans", 34: "Arabic", 35: "Armenian", 36: "Azeri", 37: "Bengali", 38: "Bhutanese", 39: "Bosnian", 40: "Bulgarian", 41: "Creole", 42: "Croatian", 43: "Czec", 44: "Danish", 45: "Dutch", 48: "Finnish", 49: "Flemmish", 50: "French", 51: "German", 52: "Greek", 53: "Gujrathi", 54: "Hindi", 55: "Cantonese", 56: "Hungarian", 57: "Indonesian", 58: "Italian", 59: "Japanese", 60: "Kannada", 61: "Korean", 62: "Malay", 63: "Male", 64: "Maltese", 65: "Malyalam", 66: "Mandarin", 67: "Marathi", 68: "Mexican", 70: "Norwegian", 71: "Pashto", 72: "Persian", 73: "Polish", 74: "Portuguese", 75: "Romanian", 76: "Russian", 77: "Serbian", 79: "Sinhalese", 80: "Slovak", 81: "Slovenian", 82: "Somali", 83: "Spanish", 84: "Swahili", 85: "Swedish", 86: "Tagalog", 87: "Tamil", 88: "Telugu", 89: "Thai", 90: "Turkish", 91: "Urdu", 92: "Uzbek", 93: "Zulu", 94: "Lithuanian", 103: "Ukrainian", 106: "Vietnamese", 109: "Catalan", 111: "Kurdish", 15129: "Gaelic", 17006: "Amharic", 20760: "Estonian", 144642: "Hebrew", 146519: "Latvian", 150273: "Albanian", 157781: "Kazakh", 159658: "Kyrgyz", 161535: "Macedonian", 163412: "Montenegrin"}, 
  other: {19: "A380 Crew", 31: "Duty Free Operator", 32: "Language Assessor", 104: "Runner Up - Star of the month", 105: "Awarded - Star of the month", 107: "Face Committee Member", 112: "B777 Crew", 113: "A330 / 340", 1110: "Nujoum", 1990: "A319 Crew", 18883: "Concerned Letter - Issued", 22637: "WMP On Watched Crew", 30145: "Meal Ordering Device", 32022: "Completed My Flight Performance", 33899: "Crew Meal Ambassador", 35776: "Peer Support Top Responder", 37653: "AED Trained", 41407: "AED Trained (Seniors)", 58300: "Tempus IC familiarization", 169043: "GCAA Attestation booklet", 172797: "Arabic Male"}
};

// Connection
let dataPool;
window.onload = function () {
  if (window.opener !== null) {
    renderer([document.querySelector("#fetchTable")]);
    fetchAgain();
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

function fetchAgain() {
  window.opener.postMessage("Ready to receive", "*");
  console.warn("Request for data sent to portal");
}

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
    let registration = description = crc = typeOfOperation = age = "";
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
    output += `<td id="aircraftAge${index}">${age}</td>`;
    output += `<td id="crc${index}">${crc != "" ? crc == 1 ? "Yes" : crc == 2 ? "LD" : crc == 3 ? "MD" : "No" : ""}</td>`;
    let crewNumber = vcm = "";
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
function start(event, n, doPositions) {
  renderer([document.querySelector("#crewTable"), document.querySelector("#keyBind")],[document.querySelector("#tripsTable"),document.querySelector("#errorTable"),],true);
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




  if (doPositions) { // Runs only if generating positions (does not run for "List only" option)
    let thisTripPositions = loadPositions(crewData, registration, hasBreak);
    console.warn("Positions loaded successfully");
    document.querySelector("#buttonRestart").restartParameters = [JSON.parse(JSON.stringify(crewData)), thisTripPositions, registration, numberOfDuties, hasBreak, doPositions];
    generatePositions(crewData, thisTripPositions, registration, numberOfDuties, hasBreak);
  } else {
    document.querySelector("#buttonRestart").restartParameters = [JSON.parse(JSON.stringify(crewData)), [], registration, numberOfDuties, hasBreak, doPositions];
  }
  createOutput(crewData, numberOfDuties, hasBreak, doPositions);
}

function restart(event) {
  renderer([], [], true);
  [crewData, thisTripPositions, registration, numberOfDuties, hasBreak, doPositions] = event.target.restartParameters;
  crewData = JSON.parse(JSON.stringify(crewData));
  if (doPositions) generatePositions(crewData, thisTripPositions, registration, numberOfDuties, hasBreak);
  createOutput(crewData, numberOfDuties, hasBreak, doPositions);
}

function back() {
  renderer([document.querySelector("#tripsTable")],[document.querySelector("#crewTable"),document.querySelector("#errorTable"),document.querySelector("#keyBind"),],true);
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
          comment: "SocialStatus" in crew && crew.SocialStatus !== null ? crew.SocialStatus : "",
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

function hideErrors() {
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

function showRegistrationInputField(event, n) {
  renderer([document.querySelector(`#registrField${n}`)],[document.querySelector(`#buttonRegistration${n}`)]);
}

function addAircraftRegistrationManually (n) {
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

function addMFP (event){
  const tagMFP = ` <span class="badge badge-mfp" title="MFP">MFP</span>`;
  const location = event.target.parentElement;
  location.innerHTML += tagMFP;
}