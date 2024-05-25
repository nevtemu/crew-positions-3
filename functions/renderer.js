export function renderer(visibleElements, invisibleElements = [], toClear = false) {
    if (Array.isArray(visibleElements) && Array.isArray(invisibleElements)) {
        visibleElements.forEach((element) => element.classList.remove("hidden"));
        invisibleElements.forEach((element) => element.classList.add("hidden"));
    } else {
        console.error("Renderer function error");
    }
    if (toClear) {
        document.querySelector("#errorOutput").innerHTML = "";
        document.querySelector("#crewOutput").innerHTML = "";
    }
}

export function hideErrors() {
    renderer([], [document.querySelector("#errorTable")]);
}

export function showRegistrationInputField(event, n) {
    renderer([document.querySelector(`#registrField${n}`)],[document.querySelector(`#buttonRegistration${n}`)]);
}

export function back() {
    renderer([document.querySelector("#tripsTable"), document.querySelector("#settings-wrapper")],[document.querySelector("#crewTable"),document.querySelector("#flightInfo"),document.querySelector("#errorTable"),document.querySelector("#keyBind"),],true);
}