const getDepartment = async () => {
  countActions();
  const id = sessionStorage["depID"];

  const depResp = await fetch(`https://localhost:44370/api/Department/${id}`);
  const department = await depResp.json();

  const selectedDepartment = department;

  document.querySelector("[data-name]").value = selectedDepartment.Name;
  const managerSelect = document.querySelector("[data-manager-select]");

  const resp = await fetch("https://localhost:44370/api/Employee");
  const Employees = await resp.json();
  Employees.forEach((emp) => {
    const managerOption = document.createElement("option");
    managerOption.text = emp.First_Name + " " + emp.Last_Name;
    managerOption.value = emp.ID;
    managerSelect.appendChild(managerOption);
  });

  managerSelect.value = selectedDepartment.Manager;
};

const saveChanges = async () => {
  const id = sessionStorage["depID"];
  const depName = document.querySelector("[data-name]").value;
  const depManager = document.querySelector("[data-manager-select").value;

  const updatedDep = {
    Name: depName,
    Manager: depManager,
  };
  let fetchParams = {
    method: "PUT",
    body: JSON.stringify(updatedDep),
    headers: { "Content-Type": "application/json" },
  };

  await fetch(`https://localhost:44370/api/Department/${id}`, fetchParams);
  alert("Updated!");
};
const goBackToDepPage = () => {
  location.href = "../pages/Departments.html";
};
