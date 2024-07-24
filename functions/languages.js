import {languages, languagesPA} from '../data/language_requirements.js'

let thirdLanguages = [];
let requiredLanguages = [];

export function languageHighlight (langList) {
    const settings = JSON.parse(localStorage.getItem('settings'));
    let output = "";
    langList.forEach( lang => {
        output+=`<span class="${lang === "Arabic" && settings.languages_and_PAs ? 'lang lang-arabic' : thirdLanguages.includes(lang) && settings.languages_and_PAs ? 'lang lang-third' : ''}">${lang}</span>, `
    })
    output = output.slice(0,-2)
    return output
}

export function filterLanguages (destinations) {
    destinations.forEach (destination => {
        if(Object.keys(languages[destination])) requiredLanguages = requiredLanguages.concat(Object.keys(languages[destination]))
        if(languagesPA[destination]) thirdLanguages =thirdLanguages.concat(languagesPA[destination])
    });
    requiredLanguages = [...new Set(requiredLanguages)]; //remove duplicates
    requiredLanguages = requiredLanguages.filter(lang => lang !== "Arabic")
    localStorage.setItem("thirdLanguages", thirdLanguages);
}

export function languagesCount (crew, dest) {
    dest = [...new Set(dest)]; //remove duplicates
    filterLanguages(dest)
    let output = `<div class="upg-wrapper"><span>📢 Languages:</span><table class="lang-table upg-block"><tr><th class="invisible"></th><th class="invisible"></th><th>min</th><th>have</th><th>max</th></tr>`;    
    for (let d of dest) {
            output += `<tr><td rowspan="${Object.keys(languages[d]).length + 1}">${d}:</td>${langSubOutput(crew, d)}</tr>`
    }
    return output += "</table></div>";
}

function langSubOutput (crew, d) {
    let subOutput = '';
    if(!languages[d]) return `<tr><td colspan="4"></td></tr>`;
    for (let lang in languages[d]) {
        const have = crew.filter(x => x.languages.includes(lang)).length
        subOutput += `<tr>
                        <td class="${lang === "Arabic" ? 'lang lang-arabic' : thirdLanguages.includes(lang) ? 'lang lang-third' : ''}">${lang}:</td>
                        <td>${languages[d][lang][0]}</td>
                        <td style="color: ${have >= languages[d][lang][0] && have <= languages[d][lang][1] ? "green" : "red"}">${have}</td>
                        <td>${languages[d][lang][1]}</td>
                        </tr>`
    }
    return subOutput;
}

export function createLanguageQueues (crews) {
    const allLanguages = thirdLanguages.length > 0 ? [...thirdLanguages, "Arabic"] : ["Arabic"]
    let languageQueues = {};
    allLanguages.forEach(language => {
        languageQueues[language] = []
        crews.filter(crew => crew.languages.includes(language)).forEach(crew => languageQueues[language].push(crew.staffNumber))
    })
    return languageQueues
}