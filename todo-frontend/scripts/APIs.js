const validateSignup = (username, email, password) => {
  try {
    const result = fetch("http://127.0.1/Todo List Backend/todo-backend/signup.php", {
      method: 'POST',
      body: {
        username,
        email,
        password
      }
    })
    response = JSON.parse(result)
    return result
  } catch (error) {
    console.log(error)
  }
}

