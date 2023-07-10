const saveNewDepartment = async () => {
  countActions();
  const depName = document.querySelector("[data-name]").value;
  const depManager = document.querySelector("[data-manager-select]").value;

  const newDep = {
    Name: depName,
    Manager: depManager,
  };

  const fetchParams = {
    method: "POST",
    body: JSON.stringify(newDep),
    headers: { "Content-Type": "application/json" },
  };

  await fetch("https://localhost:44370/api/Department", fetchParams);
  alert("Created!");
};

const getAllManagers = async () => {
  const managerSelect = document.querySelector("[data-manager-select");
  const resp = await fetch("https://localhost:44370/api/Employee");
  const Employees = await resp.json();
  Employees.forEach((emp) => {
    const managerOption = document.createElement("option");
    managerOption.text = emp.First_Name + " " + emp.Last_Name;
    managerOption.value = emp.ID;
    managerSelect.appendChild(managerOption);
  });
};
const goBackToDepPage = () => {
  location.href = "../pages/Departments.html";
};
