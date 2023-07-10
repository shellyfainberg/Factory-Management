const login = async () => {
  const userNameInput = document.querySelector("[data-username]").value;
  const passwordInput = document.querySelector("[data-password]").value;

  const resp = await fetch("https://localhost:44370/api/Login");
  const users = await resp.json();

  const key = "sf96";
  const now = new Date();
  const oneDay = 24 * 60 * 60 * 1000;
  let loginDetails = false;

  users.forEach((user) => {
    if (user.Username === userNameInput && user.Password === passwordInput) {
      loginDetails = true;
      const userData = localStorage.getItem(`usersActionsObj${user.ID}`);
      const userActionsObj = JSON.parse(userData);

      if (
        userData != null &&
        userActionsObj.userNumOfActions <= 0 &&
        now - userActionsObj.loginDate < oneDay &&
        user.ID == localStorage.getItem("loggedUserId")
      ) {
        alert("User Can not login please wait 24 hours");
      } else {
        const userObj = {
          userID: user.ID,
          userFullName: user.Full_Name,
          userName: user.Username,
          isLogin: true,
        };
        const enctyptecObj = window.encryptObject(userObj, key);

        sessionStorage.setItem("sessionObject", enctyptecObj);
        sessionStorage.setItem("loggedUserId", user.ID);

        const loginDate = new Date().getTime();

        const usersActionsObj = {
          userID: user.ID,
          userNumOfActions: user.Num_Of_Actions,
          loginDate: loginDate,
        };

        //Check if user can Login (have actions per 24 hours) actionObj
        const currentUser = localStorage.getItem(
          `usersActionsObj${usersActionsObj.userID}`
        );
        if (currentUser == null) {
          localStorage.setItem(
            `usersActionsObj${usersActionsObj.userID}`,
            JSON.stringify(usersActionsObj)
          );
        }

        //User is login after 24 hours - update actions
        if (now - userActionsObj?.loginDate > oneDay && currentUser != null) {
          const userActionsObj = JSON.parse(currentUser);
          userActionsObj.userNumOfActions = user.Num_Of_Actions;
          userActionsObj.loginDate = loginDate;
          localStorage.setItem(
            `usersActionsObj${usersActionsObj.userID}`,
            JSON.stringify(userActionsObj)
          );
        }

        location.href = "../Pages/HomePage.html";
      }
    }
  });
  if (!loginDetails) {
    alert("The username or password is incorrect");
  }
};
