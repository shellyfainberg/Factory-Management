const getAllEmployees = async () => {
  countActions();

  const resp = await fetch("https://localhost:44370/api/EmployeeWithShifts");
  const Employees = await resp.json();

  const tblObj = document.getElementById("tBody");

  const employeesList = [];
  Employees.forEach((employee) => {
    const trObj = document.createElement("tr");
    const tdObjFirstName = document.createElement("td");
    tdObjFirstName.innerText = employee.First_Name;

    const tdObjLastName = document.createElement("td");
    tdObjLastName.innerText = employee.Last_Name;

    const tdObjDepName = document.createElement("td");
    if (employee.DepartmentName == null) {
      tdObjDepName.innerText = "Unregistered";
    } else {
      tdObjDepName.innerText = employee.DepartmentName;
    }

    const tdObjYear = document.createElement("td");
    tdObjYear.innerText = employee.Start_Work_Year;

    const tdObjBtn = document.createElement("td");
    tdObjBtn.className = "buttons-wrapper";

    const deletedEmployee = document.createElement("button");
    deletedEmployee.innerText = " Delete ";
    deletedEmployee.className = "btn btn-primary btn-sm delete-btn";
    deletedEmployee.addEventListener("click", () =>
      DeleteEmployee(employee.ID)
    );
    tdObjBtn.appendChild(deletedEmployee);

    const editEmp = document.createElement("button");
    editEmp.innerText = " Edit ";
    editEmp.className = "btn btn-outline-primary btn-sm edit-btn";
    editEmp.addEventListener("click", () => goToEditEmployee(employee.ID));
    tdObjBtn.appendChild(editEmp);

    trObj.appendChild(tdObjFirstName);
    trObj.appendChild(tdObjLastName);
    trObj.appendChild(tdObjDepName);
    trObj.appendChild(tdObjYear);

    const shiftSelect = document.createElement("ul");
    if (employee.shifts.length <= 0) {
      const shiftsli = document.createElement("li");
      shiftsli.innerHTML = "No shifts Yet";
      shiftSelect.appendChild(shiftsli);
      trObj.appendChild(shiftSelect);
    }

    employee.shifts.forEach((shiftDetails) => {
      const shiftsli = document.createElement("li");
      shiftsli.className = "shiftLi";
      const formattedDate = new Date(shiftDetails.Date).toLocaleDateString(
        "en-US",
        {
          month: "long",
          day: "numeric",
          year: "numeric",
        }
      );

      shiftsli.innerText =
        formattedDate +
        " Start: " +
        `${shiftDetails.Start_Time}:00` +
        " End: " +
        `${shiftDetails.End_Time}:00`;

      shiftSelect.appendChild(shiftsli);
      trObj.appendChild(shiftSelect);
    });

    const seeMoreLabel = document.createElement("label");
    seeMoreLabel.innerText = "Show More...";
    seeMoreLabel.className = "seeMore";

    seeMoreLabel.addEventListener("click", (e) => {
      let parent = e.target.parentNode;
      let shiftListItems = parent.querySelectorAll("li");
      shiftListItems.forEach((li) => {
        li.classList.toggle("show");
      });
      seeMoreLabel.innerText.includes("More")
        ? (seeMoreLabel.innerText = "See less...")
        : (seeMoreLabel.innerText = "Show More...");
    });

    shiftSelect.appendChild(seeMoreLabel);
    trObj.appendChild(shiftSelect);

    let shiftListItems = document.querySelectorAll("ul");
    shiftListItems.forEach((list) => {
      const liCount = list.querySelectorAll("li").length;
      if (liCount >= 3) {
        list.querySelector(".seeMore").classList.add("showMe");
      }
    });

    const addShiftdDiv = document.createElement("div");
    addShiftdDiv.className = "addShift-div";
    const addShift = document.createElement("button");
    addShift.innerText = "Add shift";
    addShift.className = "btn btn-primary btn-sm";

    if (employee.shifts.length < 1) {
      const EmployeeWithoutShifts = document.createElement("span");
      EmployeeWithoutShifts.innerText = "";
      addShiftdDiv.appendChild(EmployeeWithoutShifts);
    }

    addShift.addEventListener("click", () =>
      goToAddShiftToEmployee(employee.ID)
    );
    addShiftdDiv.appendChild(addShift);
    shiftSelect.appendChild(addShiftdDiv);
    trObj.appendChild(shiftSelect);
    tblObj.appendChild(trObj);
    trObj.appendChild(tdObjBtn);

    const empObj = {
      id: employee.ID,
      First_Name: employee.First_Name,
      Last_Name: employee.Last_Name,
      Start_Work_Year: employee.Start_Work_Year,
      DepartmentName: employee.DepartmentName,
      DepartmentID: employee.DepartmentID,
    };
    employeesList.push(empObj);
  });

  const enctyptecObj = window.encryptObject(employeesList, key);
  sessionStorage.setItem("employeeObject", enctyptecObj);
};

const DeleteEmployee = async (empId) => {
  const fetchParams = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  await fetch(`https://localhost:44370/api/Employee/${empId}`, fetchParams);
  alert("Deleted!");
  countActions();
};

const goToEditEmployee = async (empId) => {
  sessionStorage["empId"] = empId;
  location.href = "../pages/EditEmployee.html";
};

const goToAddShiftToEmployee = async (empId) => {
  sessionStorage["empId"] = empId;
  location.href = "../pages/AddShiftToEmployee.html";
};
const goToSearchPage = () => {
  const searchBy = document.querySelector("[data-search]").value;
  sessionStorage["search"] = searchBy;
  location.href = "../pages/EmployeeSearchResults.html";
};
