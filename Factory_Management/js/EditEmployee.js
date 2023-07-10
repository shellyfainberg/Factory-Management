const getEmployee = async () => {
  countActions();

  const id = sessionStorage["empId"];
  const empResp = await fetch(`https://localhost:44370/api/Employee/${id}`);
  const employee = await empResp.json();

  const selectedEmployee = employee;
  document.querySelector("[data-fname]").value = selectedEmployee.First_Name;
  document.querySelector("[data-lname]").value = selectedEmployee.Last_Name;
  document.querySelector("[data-startYear]").value =
    selectedEmployee.Start_Work_Year;

  //show all the departments
  const depSelect = document.querySelector("[data-department-select");

  const resp = await fetch("https://localhost:44370/api/Department");
  const departments = await resp.json();

  departments.forEach((dep) => {
    const departmentOption = document.createElement("option");
    departmentOption.text = dep.Name;
    departmentOption.value = dep.ID;
    depSelect.appendChild(departmentOption);
  });

  depSelect.value = selectedEmployee.DepartmentID;
};

const saveChanges = async () => {
  const id = sessionStorage["empId"];
  const empFirstName = document.querySelector("[data-fname]").value;
  const empLastName = document.querySelector("[data-lname]").value;
  const empStartYear = document.querySelector("[data-startYear]").value;
  const empDepartment = document.querySelector(
    "[data-department-select]"
  ).value;

  const updatedEmp = {
    First_Name: empFirstName,
    Last_Name: empLastName,
    Start_Work_Year: empStartYear,
    DepartmentID: empDepartment,
  };
  let fetchParams = {
    method: "PUT",
    body: JSON.stringify(updatedEmp),
    headers: { "Content-Type": "application/json" },
  };
  await fetch(`https://localhost:44370/api/Employee/${id}`, fetchParams);
  alert("Updated!");
};
const goBackToEmpPage = () => {
  location.href = "../pages/Employees.html";
};
