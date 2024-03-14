const login_header = document.getElementById("login-heading")
const input_username = document.getElementById("input-username")
const input_email = document.getElementById("input-email")
const input_password = document.getElementById("input-password")
const confirm_password = document.getElementById("confirm-password")
const incorrect = document.getElementById("incorrect-error")
const have_account = document.getElementById("have-account")
const login_switch = document.getElementById("login-switch")
const login_btn = document.getElementById("login-btn")




// const validateUserLogin = (identifier, password) => {

//   if (users.length === 0) {
//     incorrect.classList.remove("invisible")
//   } else {
//     for (let i = 0; i < users.length; i++) {
//       if (username === users[i].username) {
//         found = true

//         if (password === users[i].password) {
//           window.location.href = "./pages/main.html"
//           break
//         } else {
//           incorrect.classList.remove("invisible")
//           break
//         }
//       }
//     } if (!found) {
//       incorrect.classList.remove("invisible")
//     }
//   }
// }


const validateUserSignup = (username, email, password) => {
  incorrect.innerText = "User Already Exists"

  if (username !== admin.username) {
    let found = false

    for (let i = 0; i < users.length; i++) {
      if (username === users[i].username) {
        incorrect.classList.remove("invisible")
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
  } else { incorrect.classList.remove("invisible") }
}

const checkInputIfEmpty = (username, email, password) => {
  if (username === "" || password === "" || email === "") {
    return true
  } return false
}

const validateSignup = () => {
  const username = input_username.value
  const email = input_email.value
  const password = input_password.value

  if (!checkInputIfEmpty(username, email, password)) {
    validateUserSignup(username, email, password)
  } else {
    incorrect.innerText = "Please Fill All required Fields"
    incorrect.classList.remove("invisible")
  }
}

const switchToSignup = () => {
  login_header.innerText = "Sign Up"
  have_account.innerText = "Already have an account?"
  login_switch.innerText = "Log-In"
  login_btn.innerText = "SignUp"
  incorrect.innerText = "User Already Exists"
  incorrect.classList.add("invisible")
}

const switchToLogin = () => {
  login_header.innerText = "Log In"
  have_account.innerText = "Don't have an account?"
  login_switch.innerText = "Sign-Up"
  login_btn.innerText = "LogIn"
  incorrect.innerText = "Incorrect Username or Password"
  incorrect.classList.add("invisible")
}

const toggleLoginSignup = () => {
  if (login_switch.innerText === "Sign-Up") {
    switchToSignup()
  } else {
    switchToLogin()
  }
}

const checkLoginOrSignup = () => {
  incorrect.classList.add("invisible")

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
