const login_header = document.getElementById("login-heading")
const input_username = document.getElementById("input-username")
const input_password = document.getElementById("input-password")
const incorrect = document.getElementById("incorrect-error")
const have_account = document.getElementById("have-account")
const login_switch = document.getElementById("login-switch")
const login_btn = document.getElementById("login-btn")

let users = loadUsers()

const admin = {
  username: "admin",
  password: "1234"
}

function loadUsers() {
  const users_JSON = localStorage.getItem("users");
  return users_JSON ? JSON.parse(users_JSON) : [];
}

const saveUsers = () => {
  localStorage.setItem("users", JSON.stringify(users))
}

const validateUserLogin = (username, password) => {
  let found = false

  if (users.length === 0) {
    incorrect.classList.remove("hidden")
  } else {
    for (let i = 0; i < users.length; i++) {
      if (username === users[i].username) {
        found = true

        if (password === users[i].password) {
          window.location.href = "./pages/main.html"
          break
        } else {
          incorrect.classList.remove("hidden")
          break
        }
      }
    } if (!found) {
      incorrect.classList.remove("hidden")
    }
  }
}

const validateAdminLogin = () => {
  const username = input_username.value
  const password = input_password.value

  if (username === admin.username) {
    if (password === admin.password) {
      window.location.href = "./pages/adminpanel.html"

    } else { incorrect.classList.remove("hidden") }

  } else { validateUserLogin(username, password) }
}

const validateUserSignup = (username, password) => {
  incorrect.innerText = "User Already Exists"

  if (username !== admin.username) {
    let found = false

    for (let i = 0; i < users.length; i++) {
      if (username === users[i].username) {
        incorrect.classList.remove("hidden")
        found = true
        break
      }
    }
    if (!found) {
      users.push({
        username: username,
        password: password
      })
      saveUsers()
      window.location.href = "./pages/main.html"
    }
  } else { incorrect.classList.remove("hidden") }
}

const checkInputIfEmpty = (username, password) => {
  if (username === "" || password === "") {
    return true
  } return false
}

const validateSignup = () => {
  const username = input_username.value
  const password = input_password.value

  if (!checkInputIfEmpty(username, password)) {
    validateUserSignup(username, password)
  } else {
    incorrect.innerText = "Please Fill Both Username And Password"
    incorrect.classList.remove("hidden")
  }
}

const switchToSignup = () => {
  login_header.innerText = "Sign Up"
  have_account.innerText = "Already have an account?"
  login_switch.innerText = "Log-In"
  login_btn.innerText = "SignUp"
  incorrect.innerText = "User Already Exists"
  incorrect.classList.add("hidden")
}

const switchToLogin = () => {
  login_header.innerText = "Log In"
  have_account.innerText = "Don't have an account?"
  login_switch.innerText = "Sign-Up"
  login_btn.innerText = "LogIn"
  incorrect.innerText = "Incorrect Username or Password"
  incorrect.classList.add("hidden")
}

const toggleLoginSignup = () => {
  if (login_switch.innerText === "Sign-Up") {
    switchToSignup()
  } else {
    switchToLogin()
  }
}

const checkLoginOrSignup = () => {
  incorrect.classList.add("hidden")

  setTimeout(() => {
    if (login_btn.innerText === "Login") {
      validateAdminLogin()
    } else {
      validateSignup()
    }
  }, 100)
}

login_btn.addEventListener("click", () => {
  checkLoginOrSignup()
})

login_switch.addEventListener("click", () => {
  toggleLoginSignup()
})
