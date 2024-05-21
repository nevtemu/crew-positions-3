import {breaks} from '../data/breaks.js';
import {fleet} from '../data/fleet.js';

export function autoCorrectBreaks (e) {
    const registration = localStorage.getItem("registration")
    const thisPosition = e.target.innerText.trim().split(/\s|&nbsp;/g)[0]
    const relatedBreak = e.target.nextSibling;
    relatedBreak.innerText = breaks[fleet[registration]].hasOwnProperty(thisPosition) ? breaks[fleet[registration]][thisPosition] : ""
}