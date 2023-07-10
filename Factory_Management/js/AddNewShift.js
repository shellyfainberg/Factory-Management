const saveNewShift = async () => {
  countActions();
  const date = document.querySelector("[data-date]").value;
  const start = document.querySelector("[data-start]").value;
  const end = document.querySelector("[data-end]").value;

  const newShift = {
    Date: date,
    Start_Time: parseInt(start),
    End_Time: parseInt(end),
  };

  const fetchParams = {
    method: "POST",
    body: JSON.stringify(newShift),
    headers: { "Content-Type": "application/json" },
  };

  await fetch("https://localhost:44370/api/Shift", fetchParams);
  alert("New Shift Created!");
};
const goBackToShiftPage = () => {
  location.href = "../pages/Shifts.html";
};
