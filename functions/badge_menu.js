const badges = ["W", "IR", "MFP", "PA"]

export function badgeMenu (e, hasDelete = true) {
    //remove all previous badge menus
    const previousMenu = document.querySelectorAll(".badgeMenu");
    for (let menu of previousMenu) menu.remove();
    //check existing badges
    const existingBadges = [];
    const children = e.target.closest(".centerCell").children
    for (let element of children) existingBadges.push(element.innerHTML)
    const menu = renderBadgeMenu(existingBadges, hasDelete);
    menu.originatingBadge = e.target;
    e.target.parentNode.appendChild(menu)
}

function renderBadgeMenu (existingBadges, hasDelete) {
    let menu = document.createElement("div");
    let badgesLine = "", controlsLine = "";
    badges.forEach(badge => {
        if(!existingBadges.includes(badge)) badgesLine += `<span class="badge badge-${badge.toLowerCase()}" onclick="${hasDelete ? 'replaceBadge(event)' : 'addBadge(event)'}" title="${badge}" badgeType="${badge}">${badge}</span>`
    })
    controlsLine += `<div class="badge-controls badge-close" onclick="closeBadgeMenu(event)" title="Close badge menu"></div>`
    if(hasDelete) controlsLine += `<div class="badge-controls badge-delete" onclick="deleteBadge(event)" title="Delete this badge"></div>`
    menu.innerHTML += `<div>${controlsLine}</div><div>${badgesLine}</div>`;
    menu.classList.add("badgeMenu")
    return menu;
}

export function deleteBadge (e){
    e.target.closest(".badgeMenu").originatingBadge.remove()
    e.target.closest(".badgeMenu").remove();
}

export function closeBadgeMenu (e){
    e.target.closest(".badgeMenu").remove();
}

export function addBadge (e){
    const insertPlace = e.target.closest(".centerCell")
    const type = e.target.attributes.badgeType.value;
    // e.target.remove();
    e.target.closest(".badgeMenu").remove();
    insertPlace.innerHTML += ` <span class="badge badge-${type.toLowerCase()}" onclick="badgeMenu(event)">${type}</span>`;
}

export function replaceBadge (e){
    const insertPlace = e.target.closest(".centerCell")
    const type = e.target.attributes.badgeType.value;
    e.target.closest(".badgeMenu").originatingBadge.remove()
    e.target.closest(".badgeMenu").remove();
    insertPlace.innerHTML += ` <span class="badge badge-${type.toLowerCase()}" onclick="badgeMenu(event)">${type}</span>`;
}