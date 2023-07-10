const getShiftsToAdd = async () => {
  countActions();
  const id = sessionStorage["empId"];
  const shiftsEmpResp = await fetch(
    `https://localhost:44370/api/EmployeeWithShifts/${id}`
  );
  const shiftEmps = await shiftsEmpResp.json();
  const shiftsResp = await fetch("https://localhost:44370/api/Shift");
  const shifts = await shiftsResp.json();

  const container = document.querySelector("[data-container]");
  const shiftSelect = document.querySelector("[data-shifts-select]");
  const wrapper = document.querySelector("[data-shifts-wrapper");
  const div = document.createElement("div");

  shifts.forEach((shiftDetails) => {
    const shiftOption = document.createElement("option");
    shiftOption.text =
      shiftDetails.Date +
      " Start: " +
      shiftDetails.Start_Time +
      " End: " +
      shiftDetails.End_Time;

    shiftOption.value = shiftDetails.ID;
    shiftSelect.appendChild(shiftOption);

    shiftEmps.shifts.forEach((shitf) => {
      if (shiftDetails.ID == shitf.ID) {
        shiftOption.className = "already-registered";
      }
    });
  });
  div.appendChild(shiftSelect);
  wrapper.appendChild(div);
  container.appendChild(wrapper);
};

const addShiftToEmplyoee = async () => {
  const id = sessionStorage["empId"];

  const shiftsEmpResp = await fetch(
    `https://localhost:44370/api/EmployeeWithShifts/${id}`
  );
  const shiftEmps = await shiftsEmpResp.json();
  const shiftId = document.querySelector("[data-shifts-select]").value;

  const newEmpShift = {
    EmployeeID: shiftEmps.ID,
    ShiftID: shiftId,
  };

  const fetchParams = {
    method: "POST",
    body: JSON.stringify(newEmpShift),
    headers: { "Content-Type": "application/json" },
  };

  await fetch("https://localhost:44370/api/EmployeeWithShifts", fetchParams);
  alert("New Shift Add!");
};

const goBackToEmpPage = () => {
  location.href = "../pages/Employees.html";
};
