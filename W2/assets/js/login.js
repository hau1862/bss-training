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
      window.location.replace(dashboardPath);
      alert(loginAlert.success);
    } else {
      alert(loginAlert.wrong);
    }
  } else {
    alert(loginAlert.empty);
  }

  ResetForm(loginForm);
};
