export function birthday_check(crewData, specificFlightData) {

    let flightDates = [
        new Date(convertDate(specificFlightData.flightData.FlightData[0].DepartureDate)),
        new Date(convertDate(specificFlightData.flightData.FlightData[specificFlightData.flightData.FlightData.length - 1].DepartureDate))
    ];
    flightDates = [ //Adjustment one day before and after trip to catch birthdays on those days
        new Date(flightDates[0].setDate(flightDates[0].getDate() - 1)),
        new Date(flightDates[1].setDate(flightDates[1].getDate() + 1)),
    ];
    crewData.forEach((crew) => { hasBirthday(crew, flightDates) ? crew.badges.push(1) : false; }); // 1 is the qualification number for birthday

    function convertDate(stringDate) {
        let day, month, year;
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

}