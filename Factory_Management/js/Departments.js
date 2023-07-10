const getAllDepartments = async () => {
  countActions();
  const resp = await fetch("https://localhost:44370/api/Department");
  const Departments = await resp.json();
  const tblObj = document.getElementById("tBody");

  const depManagerList = [];
  Departments.forEach((depart) => {
    const tdObjName = document.createElement("td");
    tdObjName.innerText = depart.Name;

    const tdObjMan = document.createElement("td");
    tdObjMan.innerText = depart.Manager_Name;

    const trObj = document.createElement("tr");

    trObj.appendChild(tdObjName);
    trObj.appendChild(tdObjMan);

    if (depart.HasNonManagerEmployees) {
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.className = "btn btn-primary btn-sm delete-btn";
      deleteButton.addEventListener("click", () => DeleteDepartment(depart.ID));
      trObj.appendChild(deleteButton);
    }

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.className = "btn btn-outline-primary btn-sm edit-btn";
    editButton.addEventListener("click", () => goToEditDepartment(depart.ID));

    trObj.appendChild(editButton);
    tblObj.appendChild(trObj);

    const depObj = {
      id: depart.ID,
      Name: depart.Name,
      Manager_Name: depart.Manager_Name,
      Manager_id: depart.Manager,
    };
    depManagerList.push(depObj);
  });
};
const DeleteDepartment = async (depId) => {
  const fetchParams = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  await fetch(`https://localhost:44370/api/Department/${depId}`, fetchParams);
  alert("Deleted!");
  countActions();
};
const goToEditDepartment = async (depId) => {
  sessionStorage["depID"] = depId;
  location.href = "../pages/EditDepartment.html";
};
const addNewDeparement = () => {
  location.href = "../pages/AddNewDepartment.html";
};
