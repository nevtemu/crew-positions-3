import {targets, effectiveDate as DFEffectiveDate} from '../data/duty_free_targets.js'; // Few errors due to duplicates in company files
import {prices, version, effectiveDate} from '../data/upgrade_prices.js';
import {urls} from '../data/urls.js';
import {ramadan} from '../data/ramadan.js'; // Few errors due to duplicates in company files

export function additional_info(info) {
    let upgrades = {}
    let targetsDF = {}
    let ramadanService = []

    //Get list of unique stations without DXB
    let stations = new Set(info.flightLegs)
    stations.delete("DXB")
    stations = Array.from(stations)

    // const numberOfDifferentUpgradePrices = info.sectors % 2 === 0 ? Math.ceil(info.sectors) / 2 : info.sectors
    let legs_for_upgrade = [...info.flightLegs, "DXB"]
    for (let i = 0; i < legs_for_upgrade.length -1; i++) { 
        // // For all upgrade prices
        // let pair = `${legs_for_upgrade[i]}-${legs_for_upgrade[i + 1]}`;
        // upgrades[pair] = prices[pair]

        // For unique upgrade prices
        let pair = `${legs_for_upgrade[i]}-${legs_for_upgrade[i + 1]}`;
        let reverse_pair = `${legs_for_upgrade[i+1]}-${legs_for_upgrade[i]}`
        if (!upgrades.hasOwnProperty(reverse_pair || reverse_pair) && prices.hasOwnProperty(pair)) {upgrades[pair] = prices[pair]}
    }
    for (let j = 0; j < 2; j++) { //Maximum 2 flight numbers (going, return): multiple sectors fall within same flight number
        let flightNumberInt = parseInt(info.flightNumber) + j;
        if(ramadan.hasOwnProperty(flightNumberInt.toString())) ramadanService.push(ramadan[flightNumberInt.toString()])
        targetsDF = { ...targetsDF, ...targets[flightNumberInt.toString().padStart(3, "0").padStart(5, "EK")] }
    }

    function dfOutput(targetsDF) {
        if (Object.keys(targetsDF).length < 1) {
            return `<div><div class="upg-wrapper">🛍 Inflight retail targets:<div class="upg-block">No retails target set for the flight. <br>May not have retail service on the sector.</div></div></div> `
        }
        let output = `<div class="upg-wrapper"><span>🛍 Inflight retail targets:</span><table class="df-table upg-block"><tr><th class="invisible"></th><th>AED</th></tr>`;
        for (let target in targetsDF) {
            output += `<tr><td>${target}: </td><td>${targetsDF[target]}</td></tr>`
        }
        return output += `</table>
                        <div class="upg-block smaller">Updated ${DFEffectiveDate}</div>
                        </div>`;
    }

    function upgOutput(upgrades) {
        if (!upgrades) {
            return `<div class="upg-wrapper">Upgrade prices not found for the flight</div>`
        }

        let output = `<div class="upg-wrapper"><span>💵 Upgrade prices:</span><table class="upg-table upg-block"><tr><th class="invisible"></th><th class="invisible"></th><th>AED</th><th>USD</th></tr>`;
        for (let sector in upgrades) {
            output += `<tr><td rowspan="7">${sector}:</td>${upgSubOutput(upgrades[sector])}</tr>`
        }
        return output += `</table>
                            <div class="upg-block smaller">Pricelist version ${version} (${effectiveDate})</div>
                            </div>`;
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

    function stationInfoOutput(stations) {
        if (stations.length < 1) {
            return `<div><div class="upg-wrapper">🛬 Station information:<div class="upg-block">Not available</div></div></div> `
        }
        let output = `<div class="upg-wrapper"><span>🛬 Station information:</span>`;
        stations.forEach(station => {
            output += `<div class="upg-block"><a href="${urls.stationInfo.concat(station,".aspx")}" target="_blank">${station}</a></div>`
        })
        return output += "</div>";
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
    return {targetsDF: dfOutput(targetsDF), upgrades: upgOutput(upgrades), ramadan: ramadanOutput(ramadanService), stationInfo: stationInfoOutput(stations)}
}