const loginForm = $(".login-form-container .form");

// Check All Element
if (!CheckElements(loginForm)) {
  window.location.replace(indexPath);
}

//Check Login
if (GetItem(userData.key) === userData.username) {
  window.location.replace(dashboardPath);
}

loginForm.onsubmit = function (event) {
  event.preventDefault();
  let username = this.username.value;
  let password = this.password.value;

  if (username && password) {
    if (username === userData.username && password === userData.password) {
      SetItem(userData.key, username);
      SetItem(isLoginKey, true);
      window.location.replace(dashboardPath);
    } else {
      ShowAlert(alertType.error, loginAlert.wrong);
    }
  } else {
    ShowAlert(alertType.warning, loginAlert.empty);

  }

  ResetForm(loginForm);
};
