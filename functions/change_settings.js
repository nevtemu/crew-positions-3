export function changeSettings(e) {
    let key = e.srcElement.id;
    let value = e.srcElement.checked;
    let settings = JSON.parse(localStorage.getItem("settings"))
    settings[key] = value;
    localStorage.setItem("settings", JSON.stringify(settings));
}

