import targets from '../data/duty_free_targets.json' assert { type: "json" }; // Few errors due to duplicates in company files
import prices from '../data/upgrade_prices.json' assert { type: "json" };
import urls from '../data/urls.json' assert { type: "json" };
import ramadan from '../data/ramadan.json' assert { type: "json" }; // Few errors due to duplicates in company files

export function additional_info(info) {
    let upgrades = {}
    let targetsDF = {}
    let ramadanService = []

    const numberOfDifferentUpgradePrices = info.sectors % 2 === 0 ? Math.ceil(info.sectors) / 2 : info.sectors
    for (let i = 0; i < numberOfDifferentUpgradePrices; i++) {
        let pair = `${info.flightLegs[i]}-${info.flightLegs[i + 1]}`;
        upgrades[pair] = prices[pair]
    }
    for (let j = 0; j < 2; j++) { //Maximum 2 flight numbers (going, return): multiple sectors fall within same flight number
        let flightNumberInt = parseInt(info.flightNumber) + j;
        if(ramadan.hasOwnProperty(flightNumberInt.toString())) ramadanService.push(ramadan[flightNumberInt.toString()])
        targetsDF = { ...targetsDF, ...targets[flightNumberInt.toString().padStart(3, "0").padStart(5, "EK")] }
    }

    function dfOutput(targetsDF) {
        if (Object.keys(targetsDF).length < 1) {
            return `<div><div class="upg-wrapper">No retails target set for the flight.<div class="upg-block">May not have retail service on the sector.</div></div></div> `
        }
        let output = `<div class="upg-wrapper"><span>🛍 Inflight retail targets:</span><table class="df-table upg-block"><tr><th class="invisible"></th><th>AED</th></tr>`;
        for (let target in targetsDF) {
            output += `<tr><td>${target}: </td><td>${targetsDF[target]}</td></tr>`
        }
        return output += "</table></div>";
    }

    function upgOutput(upgrades) {
        if (!upgrades) {
            return `<div class="upg-wrapper">Upgrade prices not found for the flight</div>`
        }

        let output = `<div class="upg-wrapper"><span>💵 Upgrade prices:</span><table class="upg-table upg-block"><tr><th class="invisible"></th><th class="invisible"></th><th>AED</th><th>USD</th></tr>`;
        for (let sector in upgrades) {
            output += `<tr><td rowspan="7">${sector}:</td>${upgSubOutput(upgrades[sector])}</tr>`
        }
        return output += "</table></div>";
    }

    function ramadanOutput(ramadanService) {
        if (ramadanService.length < 1) {
            return `<div><div class="upg-wrapper">🌙 Ramadan service:<div class="upg-block">No specific ramadan service set for the flight</div></div></div> `
        }
        let output = `<div class="upg-wrapper"><span>🌙 Ramadan service:</span><table class="ramadan-table upg-block"><tr>
                                <th class="invisible"></th><th>Catering information</th><th>Scenario</th></tr>`;
        ramadanService.forEach(flight => {
            output += `<tr><td>${flight.sector}: </td><td>${flight.info}</td><td><a href="${urls.ramadan+(flight.scenario + 11)}">${flight.scenario}</a></td></tr>`
        })
        return output += "</table></div>";
    }

    function upgSubOutput(upg) {
        let subOutput = "";
        for (let type in upg) {
            subOutput += `<tr><td>${upgReplaceName(type)}</td>
                    <td>${upg[type][0]}</td>
                    <td>${upg[type][1]}</td></tr>`
        }
        return subOutput;
    }

    function upgReplaceName(upg_type) {
        let styled = "";
        switch (upg_type) {
            case "bulkhead":
                styled = `<span>Bulkhead</span>`
                break;
            case "legroom":
                styled = `<span>Extra legroom</span>`
                break;
            case "YtoW":
                styled = `<span class="upg upg-y">Y</span> &#10132; <span class="upg upg-w">W</span>`
                break;
            case "YtoJ":
                styled = `<span class="upg upg-y">Y</span> &#10132; <span class="upg upg-j">J</span>`
                break;
            case "JtoF":
                styled = `<span class="upg upg-j">J</span> &#10132; <span class="upg upg-f">F</span>`
                break;
            case "WtoJ":
                styled = `<span class="upg upg-w">W</span> &#10132; <span class="upg upg-j">J</span>`
                break;
            default:
                errorHandler("Error in upgrade type name", "error")
        }
        return styled;
    }
    return {targetsDF: dfOutput(targetsDF), upgrades: upgOutput(upgrades), ramadan: ramadanOutput(ramadanService)}
}