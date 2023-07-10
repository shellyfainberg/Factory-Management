const key = "sf96";

const checkIfLogin = () => {
  const encryptedValue = sessionStorage.getItem("sessionObject");
  const decryptObj = window.decryptObject(encryptedValue, key);

  if (decryptObj.isLogin == true) {
    const encryptedValue = sessionStorage.getItem("sessionObject");
    const decryptObj = window.decryptObject(encryptedValue, key);

    const userFullName = document.querySelector("[data-user-fullName]");
    userFullName.innerText = `Hello ${decryptObj.userFullName}`;
  } else {
    location.href = "Login.html";
  }
};
const countActions = () => {
  const userId = sessionStorage.getItem("loggedUserId");
  let userActions = localStorage.getItem(`usersActionsObj${userId}`);
  const userActionsObj = JSON.parse(userActions);
  --userActionsObj.userNumOfActions;
  localStorage.setItem(
    `usersActionsObj${userId}`,
    JSON.stringify(userActionsObj)
  );

  if (userActionsObj.userNumOfActions <= 0) {
    const encryptedValue = sessionStorage.getItem("sessionObject");
    const decryptObj = window.decryptObject(encryptedValue, key);

    decryptObj.isLogin = false;

    const enctyptecObj = window.encryptObject(decryptObj, key);
    sessionStorage.setItem("sessionObject", enctyptecObj);
  }
};

const logout = () => {
  const encryptedValue = sessionStorage.getItem("sessionObject");
  const decryptObj = window.decryptObject(encryptedValue, key);

  decryptObj.isLogin = false;

  const enctyptecObj = window.encryptObject(decryptObj, key);
  sessionStorage.setItem("sessionObject", enctyptecObj);

  location.href = "Login.html";
};
