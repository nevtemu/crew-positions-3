export function changeSettings(e) {
    let key = e.srcElement.id;
    let value = e.srcElement.checked;
    let settings = JSON.parse(localStorage.getItem("settings"))
    settings[key] = value;

    //Save to cookie
    let expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 1);
    document.cookie = `settings=${JSON.stringify(settings)}; expires=${expiry}`

    //Save to local storage
    localStorage.setItem("settings", JSON.stringify(settings));
}

