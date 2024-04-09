export function repeatHighlight(e) {
    const thisPosition = e.target.innerText.trim().split(/\s|&nbsp;/g)[0]
    const thisCell = e.target;
    const columnIndex = e.target.cellIndex;
    let allRows = e.target.parentElement.parentElement.childNodes; // Go two levels up to <tbody> and grab its children
    let positionsInColumn = []
    allRows = Array.from(allRows).filter(row => row.children[columnIndex] !== undefined && row.children[columnIndex].innerText !== "Position")
    allRows.forEach(row => positionsInColumn.push(row.children[columnIndex].innerText.trim().split(/\s|&nbsp;/g)[0]))
    allRows.forEach(row => row.children[columnIndex].classList.remove("repeated"))
    // console.log(positionsInColumn)
    const repeatingPositions = positionsInColumn.filter((item, index) => positionsInColumn.indexOf(item) !== index);

    if (repeatingPositions.length) {
        const repeatingRows = allRows.filter(row => repeatingPositions.includes(row.children[columnIndex].innerText.trim().split(/\s|&nbsp;/g)[0]))
        repeatingRows.forEach(row => row.children[columnIndex].classList.add("repeated"))
    }
}