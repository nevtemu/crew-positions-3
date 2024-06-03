export function changeNumberOfDuties (e) {
    let n = parseInt(e.target.id.replace("sectors", ""))
    let newNumberSectors = e.target.valueAsNumber
    const defaultCheckbox = document.createElement('input');
    defaultCheckbox.classList.add("breaksCheckboxes")
    defaultCheckbox.type = "checkbox"
    defaultCheckbox.title = "manual"
    const tag = document.querySelector(`#rest${n}`)
    const nodes = document.querySelector(`#rest${n}`).childNodes;
    if(newNumberSectors > nodes.length) {
        let difference = newNumberSectors - nodes.length;
        while(difference > 0){
        let clone = defaultCheckbox.cloneNode(true);
        tag.appendChild(clone)
        difference--
        }
    }
    else if (newNumberSectors < nodes.length){
        let difference = nodes.length - newNumberSectors;
        while(difference > 0){
        tag.removeChild(nodes[nodes.length-1])
        difference--
        }
    }
}