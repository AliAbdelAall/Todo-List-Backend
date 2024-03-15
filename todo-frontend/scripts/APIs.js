const validateSignup = async (username, email, password) => {
  try {
    const signup_formdata = new URLSearchParams()
    signup_formdata.append("username", username)
    signup_formdata.append("email", email)
    signup_formdata.append("password", password)

    const result = await fetch("http://127.0.0.1/Todo%20List%20Backend/todo-backend/signup.php", {
      method: 'POST',
      body: signup_formdata,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    const response = await result.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}

const validateLogin = async (identifier, password) => {
  try {
    const login_formdata = new URLSearchParams()
    login_formdata.append("identifier", identifier)
    login_formdata.append("password", password)
    const result = await fetch("http://127.0.0.1/Todo%20List%20Backend/todo-backend/login.php", {
      method: 'POST',
      body: login_formdata,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    response = await result.json()
    return response
  } catch (error) {
    console.log(error)
  }
}

const saveUserId = (id) => {
  localStorage.setItem("user_id", id)
  console.log(id)
}

const validateUserLogin = async (identifier, password) => {
  console.log("validateUserLogin")
  const valid_login = await validateLogin(identifier, password)
  if (valid_login.status === "success") {
    saveUserId(valid_login.user_id)
    window.location.href = "http://127.0.0.1:5500/todo-frontend/pages/todo.html"
  } else {
    incorrect.innerText = "Incorrect Username or Password"
    incorrect.classList.remove("invisible")
  }
}