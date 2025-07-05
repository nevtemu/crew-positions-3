export const typesOfAircraft = {
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
    // 12: {typesOfAircraftIndex: 12, crc: 2, aircraftModel: "A380", classes: 3, description: "A380 3 class (New lounge)", fullDescription: "A380 3 class (with LD-CRC, New lounge)"} //seems like all of these are retrofitted into 4 class A380 (type 10 in my script)
    12: {typesOfAircraftIndex: 12, crc: 1, aircraftModel: "B773", classes: 4, description: "B773 4 class (Game changer)", fullDescription: "B773 4 class (with CRC, Game changer)"}, 
    13: {typesOfAircraftIndex: 13, crc: -1, aircraftModel: "A350", classes: 3, description: "A350 3 class (no F)", fullDescription: "A350 3 class (no CRC, no first class)"}, 
    
    14: {typesOfAircraftIndex: 14, crc: -1, aircraftModel: "A380", classes: 4, description: "A380 4 class", fullDescription: "A380 4 class (no CRC)"}, 
    15: {typesOfAircraftIndex: 15, crc: 3, aircraftModel: "A380", classes: 4, description: "A380 4 class", fullDescription: "A380 4 class (MD-CRC)"}, 
    16: {typesOfAircraftIndex: 16, crc: 1, aircraftModel: "B773", classes: 4, description: "B773 4 class", fullDescription: "B773 4 class (non-Game changer)"}, 
    17: {typesOfAircraftIndex: 17, crc: -1, aircraftModel: "B773", classes: 4, description: "B773 4 class", fullDescription: "B773 4 class (no-CRC)"}, 

  };

  /*
  CRC:
  -1 - no CRC
  1 - B773 CRC
  2 - LD CRC
  3 - MD CRC 
*/

/*
Aircraft with W;
10,12,13,14,15,16,17
*/


/*
4: B772 2 class (with CRC, JC Falcon seats)

5: B773 2 class (no CRC)
6: B773 3 class (no CRC)
1: B773 3 class (with CRC)
2: B773 3 class (with CRC, JC Falcon seats)
3: B773 3 class (with CRC, Game changer)
12: B773 4 class (with CRC, Game changer)
16: B773 4 class (with CRC, 8 suits in F)

7: A380 2 class (no CRC)
8: A380 3 class (no CRC)
14: A380 4 class (no CRC)
9: A380 3 class (with MD-CRC)
15: A380 4 class (with MD-CRC)
11: A380 3 class (with LD-CRC)
10: A380 4 class (with LD-CRC)

13: A350 3 class (no CRC, no first class)
*/


/*
1: B773 3 class (with CRC)
- 2: B773 3 class (with CRC, JC Falcon seats) all changed to 4 class (type 16)
- 3: B773 3 class (with CRC, Game changer) all changed to type 12
4: B772 2 class (with CRC, JC Falcon seats)
5: B773 2 class (no CRC)
6: B773 3 class (no CRC)

7: A380 2 class (no CRC)
8: A380 3 class (no CRC)
9: A380 3 class (with MD-CRC)
10: A380 4 class (with LD-CRC)
11: A380 3 class (with LD-CRC)

12: B773 4 class (with CRC, Game changer)
13: A350 3 class (no CRC, no first class)
14: A380 4 class (no CRC)
15: A380 4 class (MD-CRC)
16: B773 4 class (with CRC, 8 suits in F)
17: B773 4 class (no CRC)
*/