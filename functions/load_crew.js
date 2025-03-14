import {qualifications} from '../data/qualifications.js';
import {errorHandler} from '../functions/error_handler.js'

// const names = [
//     "Robert Downey Jr.",
//     "Al Pacino",
//     "Hugh Jackman",
//     "Robert Pattinson",
//     "Keanu Reeves",
//     "Chris Evans",
//     "Dwayne Johnson",
//     "Tom Hanks",
//     "Johnny Depp",
//     "Morgan Freeman",
//     "Zac Efron",
//     "Bradley Cooper",
//     "Jackie Chan",
//     "Will Smith",
//     "Tom Cruise",
//     "Denzel Washington",
//     "Robert De Niro",
//     "Leonardo DiCaprio",
//     "Nicolas Cage",
//     "Marlon Brando",
//     "Jack Nicholson",
//     "Christian Bale",
//     "Anthony Hopkins",
//     "Julia Roberts",
//     "Natalie Portman"
//     ]

export function loadCrew(inputData) {
    let crewData = [];
    const indexModifier = {PUR: 0, CSV: 10, FG1: 20, GR1:30, W:40, GR2:50, CSA:70}
    inputData.forEach((crew, index) => {
        let badges = [], languages = [], ratingIR = 21, destinationExperience = {};
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
        if (crew.OperationGrade !== crew.HRGrade) errorHandler(["PUR", "CSV"].includes(crew.OperationGrade) ? `${crew.FirstName} on the pool` : `${crew.FirstName} operates out of grade`, "info");
        crew.destinationExperiences.map((destination) => {if(destination.Destination !== "DXB") destinationExperience[destination.Destination] = destination.VisitedCount})
        crewData.push({
            index: index + indexModifier[crew.OperationGrade],
            ratingIR,
            languages,
            badges,
            grade: crew.OperationGrade,
            originalGrade: crew.OperationGrade ===  "W" ? "GR2" : crew.OperationGrade,
            outOfGrade: crew.OperationGrade !== crew.HRGrade, //there is another parameter RosterGrade in case if entire roster is out of grade
            flag: crew.NationalityCode.toLowerCase(), 
            timeInGrade: crew.GradeExp,
            doingDF: false,
            doingPA: {},
            birthday: new Date(crew.DOB),
            timeInGradeNumber: crew.OperationGrade !== crew.HRGrade ? 0 : timeInGradeNumber(crew.GradeExp),
            lastPosition: ["PUR", "CSA"].includes(crew.OperationGrade) ? [] : ["GR1", "FG1", "CSV"].includes(crew.OperationGrade) ? [""] : ["", ""],
            comment: "SocialStatus" in crew && crew.SocialStatus !== null ? crew.SocialStatus.replaceAll("'", "&apos;").replaceAll("\"", "&quot;") : "",
            staffNumber: crew.StaffID,
            fullname: crew.FirstName + " " + crew.LastName,
            nickname: "NickName" in crew && crew.NickName !== "" ? crew.NickName : crew.FirstName.split(" ")[0],

            // fullname: names[index],
            // staffNumber: Math.floor(Math.random() * (599998)) + 100000,
            // nickname: names[index].split(" ")[0],

            destinationExperience,
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

function timeInGradeNumber (string) {
    let elements = string.split(" ");
    let y = parseInt(elements[0]);
    let m = parseInt(elements[2]);
    return m + (y * 12);
}