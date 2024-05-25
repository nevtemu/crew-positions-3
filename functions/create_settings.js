export function createSettings (settings) {
    const tag = document.querySelector("#settings-output");
    let output = '';
    // const settings = JSON.parse(localStorage.getItem("settings"))
    for (let setting in settings) {
        output+=`<tr>
        <td><label for="${setting}">${setting.charAt(0).toUpperCase() + setting.slice(1).replaceAll('_'," ")}</label></td>
        <td><label class="toggle"><input type="checkbox" id="${setting}" ${settings[setting] ? "checked" : ""} onchange="changeSettings(event)"><span class="slider"></span></label></td>
        </tr>`
    }
    tag.innerHTML = output;
}