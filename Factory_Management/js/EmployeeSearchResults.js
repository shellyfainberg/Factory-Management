const getFilterdEmployees = async () => {
  countActions();
  const searchBy = sessionStorage["search"].toLowerCase();
  const resp = await fetch("https://localhost:44370/api/EmployeeWithShifts");
  const Employees = await resp.json();

  const tblObj = document.getElementById("tBody");

  const employeesList = [];
  const searchEmp = Employees.filter(
    (emp) =>
      emp.First_Name.toLowerCase().startsWith(searchBy) ||
      emp.Last_Name.toLowerCase().startsWith(searchBy) ||
      emp.DepartmentName.toLowerCase().startsWith(searchBy)
  );

  searchEmp.forEach((employee) => {
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
    trObj.appendChild(tdObjFirstName);
    trObj.appendChild(tdObjLastName);
    trObj.appendChild(tdObjDepName);
    trObj.appendChild(tdObjYear);

    const shiftSelect = document.createElement("ul");
    employee.shifts.forEach((shiftDetails) => {
      const shiftsli = document.createElement("li");
      shiftsli.innerText =
        shiftDetails.Date +
        " Start: " +
        shiftDetails.Start_Time +
        " End: " +
        shiftDetails.End_Time;
      shiftSelect.appendChild(shiftsli);
      trObj.appendChild(shiftSelect);
    });

    tblObj.appendChild(trObj);

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
};
const goBackToEmployee = () => {
  location.href = "../pages/Employees.html";
};
