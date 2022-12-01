const loginForm = $(".login-form-container .login-form");

if (!CheckReady(loginForm)) {
  window.location.replace(inputPath);
}

if (localStorage.getItem(userData.key) === userData.username) {
  window.location.replace(dashboardPath);
}

loginForm.onsubmit = function (event) {
  event.preventDefault();

  let username = this.username.value;
  let password = this.password.value;
  if (username && password) {
    if (username === userData.username && password === userData.password) {
      localStorage.setItem(userData.key, username);
      window.location.replace(dashboardPath);
    } else {
      alert("Username or password is wrong");
    }
  } else {
    alert("Username or password is empty");
  }
};
