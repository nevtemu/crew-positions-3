import {qualifications} from '../data/qualifications.js';
import {errorHandler} from '../functions/error_handler.js'

export function loadCrew(inputData) {
    let crewData = [];
    inputData.forEach((crew, index) => {
        let badges = [], languages = [], ratingIR = 21;
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
        crewData.push({
            index,
            ratingIR,
            languages,
            badges,
            grade: crew.OperationGrade,
            originalGrade: crew.OperationGrade,
            outOfGrade: crew.OperationGrade !== crew.HRGrade, //there is another parameter RosterGrade in case if entire roster is out of grade
            flag: crew.NationalityCode,
            staffNumber: crew.StaffID,
            timeInGrade: crew.GradeExp,
            doingDF: false,
            birthday: new Date(crew.DOB),
            timeInGradeNumber: crew.OperationGrade !== crew.HRGrade ? 0 : timeInGradeNumber(crew.GradeExp),
            lastPosition: ["PUR", "CSA"].includes(crew.OperationGrade) ? [] : ["GR1", "FG1", "CSV"].includes(crew.OperationGrade) ? [""] : ["", ""],
            comment: "SocialStatus" in crew && crew.SocialStatus !== null ? crew.SocialStatus.replaceAll("'", "&apos;").replaceAll("\"", "&quot;") : "",
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

function timeInGradeNumber (string) {
    let elements = string.split(" ");
    let y = parseInt(elements[0]);
    let m = parseInt(elements[2]);
    return m + (y * 12);
}