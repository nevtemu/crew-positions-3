import {loadPositions} from './load_positions.js'
const positionsOutput = document.querySelector("#positionsOutput")

export const drawPositions = () => {
    // let positions = JSON.parse(localStorage.getItem("thisTripPositions"));
    const registration = localStorage.getItem("registration");
    const crew = JSON.parse(localStorage.getItem("crewData"));
    let positions = loadPositions(crew, registration, false, true); 
    console.log(positions)
    let output = "";
    for (let grade in positions) {
        output += `<div style="width:100%"><div class="grade-label pos-${grade.toLowerCase()}" >${grade}</div><div class="${["GR1","GR2", "W", "FG1"].includes(grade) ? '' : 'landing'} grade pos-frame-${grade.toLowerCase()}">`
        for (let type in positions[grade]) {
            if (type !== 'only') output += `<div class="type-wrapper pos-frame-${grade.toLowerCase()}" type="${type}"><div class="pos-${grade.toLowerCase()}">${type.replace('galley', "Galley").replace('df','Retail').replace('remain', 'Other')}</div><div class="landing pos-frame-${grade.toLowerCase()}">`
            positions[grade][type].forEach(position => {
                output += `<div class="position" draggable="true" id="${position}">${position}</div>`
            })
            if (type !== 'only') output += `</div></div>`
        }
        output += `</div></div>`
    }
    positionsOutput.innerHTML = output + `<div>* Do not leave retail positions empty. <br>** Make sure you know what you're doing before manually adjusting positions as it may break entire algorithm! </div>`
    document.querySelector("#apply").addEventListener("click", apply);

    //Draggable elements
    const positionsElements = document.querySelectorAll(".position");
    const gradeContainers = document.querySelectorAll(".landing");
    positionsElements.forEach(y => {
        y.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", e.target.id);
            setTimeout(() => {
                e.target.style.opacity = "0.5"; // Makes dragged element semi-transparent
            }, 0);
        });

        y.addEventListener("dragend", (e) => {
            e.target.style.opacity = "1"; // Resets opacity after drop
        });
    });

    gradeContainers.forEach(x => {
        x.addEventListener("dragover", (e) => {
            e.preventDefault(); // Allows drop
        });

        x.addEventListener("drop", (e) => {
            e.preventDefault();
            const draggedElement = document.querySelector(".position[style*='opacity: 0.5']");
            if (draggedElement) {
                x.appendChild(draggedElement); // Move the element to the new container
            }
        });
    });
}

import {restart} from './create_output_restart.js'
const apply = (e) => {
    let positions = {};
    Array.from(positionsOutput.children).forEach(grade => {
        let gradeName, typeName, positionArray;
        gradeName = grade.firstChild.innerHTML;
        positions[gradeName] = {}
        if(["GR1","GR2", "W", "FG1"].includes(gradeName)) {
            Array.from(grade.lastElementChild.children).forEach(type => {
                typeName = type.getAttribute('type')
                positions[gradeName][typeName] = []
                Array.from(type.lastElementChild.children).forEach(position => {
                    positions[gradeName][typeName].push(position.innerHTML)
                })
            })
        } else {
            typeName = 'only'
            positions[gradeName][typeName] = []
            Array.from(grade.lastElementChild.children).forEach(position => {
                positions[gradeName][typeName].push(position.innerHTML)
            })
        }
    })
    // console.log(positions)
    localStorage.setItem("thisTripPositions", JSON.stringify(positions));
    restart()
}

