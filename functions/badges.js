export function badges(badges) {
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