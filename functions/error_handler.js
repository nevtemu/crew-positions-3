import {renderer} from '../functions/renderer.js'

export function errorHandler(message, style) {
    document.querySelector("#errorOutput").innerHTML += `<div class="warn message-${style}">${message}<div>`;
    renderer([document.querySelector("#errorTable"),document.querySelector("#keyBind"),]);
}