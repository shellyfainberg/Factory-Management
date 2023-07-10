const getAllShifts = async () => {
  countActions();

  const resp = await fetch("https://localhost:44370/api/ShiftWithEmployees");
  const Shifts = await resp.json();

  const tblObj = document.getElementById("tBody");

  Shifts.forEach((shift) => {
    const trObj = document.createElement("tr");
    const tdObjDate = document.createElement("td");
    tdObjDate.innerText = new Date(shift.Date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const tdObjStart = document.createElement("td");
    tdObjStart.innerText = `${shift.Start_Time}:00`;

    const tdObjEnd = document.createElement("td");
    tdObjEnd.innerText = `${shift.End_Time}:00`;

    trObj.appendChild(tdObjDate);
    trObj.appendChild(tdObjStart);
    trObj.appendChild(tdObjEnd);
    tblObj.appendChild(trObj);

    //create employees list
    const empList = document.createElement("ul");
    shift.Employees.forEach((emp) => {
      const empli = document.createElement("li");
      empli.className = "emp-item";
      const empLink = document.createElement("a");
      empLink.href = "../pages/EditEmployee.html";

      empLink.addEventListener("click", () => {
        sessionStorage["empId"] = emp.ID;
      });

      empLink.innerText = emp.First_Name + " " + emp.Last_Name;

      empli.appendChild(empLink);
      empList.appendChild(empli);
      trObj.appendChild(empList);
    });
    if (shift.Employees.length < 1) {
      const empli = document.createElement("li");
      empli.className = "emp-item";
      const empLink = document.createElement("a");
      empLink.innerText = "Unregistered";
      empli.appendChild(empLink);
      empList.appendChild(empli);
      trObj.appendChild(empList);
    }
  });
};
const addNewShift = () => {
  location.href = "../pages/AddNewShift.html";
};
