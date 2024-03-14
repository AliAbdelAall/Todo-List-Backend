const validateSignup = async (username, email, password) => {
  try {
    const formdata = new URLSearchParams()
    formdata.append("username", username)
    formdata.append("email", email)
    formdata.append("password", password)

    console.log(username, email, password)
    const result = await fetch("http://127.0.0.1/Todo%20List%20Backend/todo-backend/signup.php", {
      method: 'POST',
      body: formdata,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    // console.log(result);
    const response = await result.json();
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

const validateLogin = async (identifier, password) => {
  try {
    const result = await fetch("http://127.0.1/Todo List Backend/todo-backend/login.php", {
      method: 'POST',
      body: {
        identifier,
        password,
      }
    })
    response = await result.json()
    return response
  } catch (error) {
    console.log(error)
  }
}