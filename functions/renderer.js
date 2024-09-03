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

export function showHiddenCells () {
    const showButton = document.querySelector("#buttonShowHiddenCells")
    showButton.classList.add("hidden")
    const group = document.querySelectorAll(".hiddenCell")
    for (let cell of group) {
        cell.classList.remove("hidden")
        cell.classList.remove("hiddenCell")
    }
}

export function hideColumn (e) {
    const showButton = document.querySelector("#buttonShowHiddenCells")
    if (showButton.classList.contains("hidden")) showButton.classList.remove("hidden")
    const groupName = e.srcElement.attributes.group.value;
    console.log(e.srcElement.attributes.group.value);
    const group = document.querySelectorAll(`[group|=${groupName}]`)
    for (let cell of group) {
        cell.classList.add("hidden")
        cell.classList.add("hiddenCell")
    }
}