const validateSignup = async (username, email, password) => {
  try {
    const result = await fetch("http://127.0.0.1/Todo%20List%20Backend/todo-backend/signup.php", {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log(result);
    const response = await result.json();
    console.log(response);
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
    response = await JSON.parse(result)
    return result
  } catch (error) {
    console.log(error)
  }
}