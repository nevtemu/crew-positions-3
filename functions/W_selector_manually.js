export function selectWManually(e) {
  const dialog = document.querySelector("dialog");
  dialog.showModal();

  const n = e.target.value;
  let listOfYCrew = dataPool[n].crewData.filter(
    (crew) => crew.OperationGrade === "GR2" || crew.OperationGrade === "W"
  );

  const crewListTag = document.querySelector("#crewList");
  let output = "";
  listOfYCrew.forEach((crew) => {
    output += `<li><input type="checkbox" id="${crew.StaffID}" ${
      crew.Profile.includes("Premium Economy crew")
        ? 'checked disabled="disabled"'
        : crew.OperationGrade === "W"
        ? "checked"
        : false
    }><label for="${crew.StaffID}">${crew.StaffID} (${
      crew.FirstName + " " + crew.LastName
    })</label></li>`;
  });
  crewListTag.innerHTML = output;

  const closeButton = document.querySelector("#dialogClose");
  closeButton.addEventListener("click", () => {
    dialog.close();
  });
  const submitButton = document.querySelector("#dialogSubmit");
  submitButton.addEventListener("click", submitWManually);

  function submitWManually() {
    //Prevent user from selecting more than 2 crew
    const numberSelected = crewListTag.querySelectorAll('input:checked').length
    if (numberSelected > 2) {
      const alertTag = document.querySelector("#w_manual_alert");
      alertTag.innerHTML = `Select your W crew <span style='color:red'>(maximum 2)</span>:`
    }

    // Update data
    else {
      const userSelection = crewListTag.querySelectorAll("input");
      userSelection.forEach((element) => {
        if (element.checked)
          dataPool[n].crewData.find(
            (crew) => crew.StaffID === element.id
          ).OperationGrade = "W";
        else
          dataPool[n].crewData.find(
            (crew) => crew.StaffID === element.id
          ).OperationGrade = "GR2";
      });
      dialog.close();
    }
  }
}
