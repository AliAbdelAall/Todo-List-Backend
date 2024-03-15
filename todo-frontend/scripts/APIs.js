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

const saveUserData = (user_data) => {
  localStorage.setItem("user_data", JSON.stringify(user_data))
}

const validateUserLogin = async (identifier, password) => {
  console.log("validateUserLogin")
  const user_data = await validateLogin(identifier, password)
  if (user_data.status === "success") {
    saveUserData(user_data)
    window.location.href = "http://127.0.0.1:5500/todo-frontend/pages/todo.html"
  } else {
    incorrect.innerText = "Incorrect Username or Password"
    incorrect.classList.remove("invisible")
  }
}

const saveTodo = async (user_id, todo, completed) => {
  try {
    const save_todo_formdata = new URLSearchParams()
    save_todo_formdata.append("user_id", user_id)
    save_todo_formdata.append("todo", todo)
    save_todo_formdata.append("completed", completed)
    const result = await fetch("http://127.0.0.1/Todo%20List%20Backend/todo-backend/save-todo.php", {
      method: 'POST',
      body: save_todo_formdata,
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

const deleteTodo = async (id) => {
  try {
    const delete_todo_formdata = new URLSearchParams()
    delete_todo_formdata.append("id", id)
    const result = await fetch("http://127.0.0.1/Todo%20List%20Backend/todo-backend/delete-todo.php", {
      method: 'POST',
      body: delete_todo_formdata,
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
