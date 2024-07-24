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

export function copyTable () {
    const crewTable = document.querySelector("#crewOutput table");
    const crewTableCopy = new Blob([crewTable.outerHTML], {type: 'text/html'});
    navigator.clipboard.write([new ClipboardItem({'text/html': crewTableCopy})])
}

export function hideGUI() {
    if (document.querySelector("#crewTable").classList.contains("hidden")) { // For errors on trip table
        document.querySelector("#errorTable").classList.toggle("hidden");
        return;
    }
    if (!document.querySelector("#crewControls").classList.contains("hidden")) {
        document.querySelectorAll(".UIhood").forEach((element) => element.classList.add("hidden"));
        return;
    }
    document.querySelectorAll(".UIhood").forEach((element) => element.classList.remove("hidden"));
}