const input_box = document.getElementById("input-box")
const list_container = document.getElementById("list-container")
const add_button = document.getElementById("add-button")
const incorrect = document.getElementById("incorrect")
const score = document.getElementById("score")

const user_data = JSON.parse(localStorage.getItem("user_data"));

const createTodo = (id, todo) => {
  const todo_wrapper = document.createElement("div")
  todo_wrapper.append(todo)
  todo_wrapper.className = "flex space-between wrap todo"
  todo_wrapper.id = id

  const delete_icon = document.createElement("i")
  delete_icon.className = "fa-solid fa-x delete"
  todo_wrapper.append(delete_icon)

  const edit_icon = document.createElement("i")
  edit_icon.className = "fa-regular fa-pen-to-square edit"
  todo_wrapper.append(edit_icon)

  return todo_wrapper
}

const loadTodos = () => {
  let score_count = 0

  if (user_data.status === "success") {
    const todos = user_data.todos

    todos.forEach((todo) => {
      const todo_task = createTodo(todo.id, todo.todo)

      list_container.appendChild(todo_task)

      if (todo.completed == "1") {
        score_count += 1
      }
    })
    score.innerText = score_count
  }
}

loadTodos()

const deleteTodoTask = () => {
  const todos_list = list_container.querySelectorAll(".todo")
  console.log(todos)
  todos_list.forEach((todo) => {
    todo.addEventListener("click", async (element) => {

      if (element.target.classList.contains("delete")) {
        const element_id = element.id

        await deleteTodo(element_id)
        element.remove()
      }
    })
  })
}

const addTodo = async (user_id, todo, completed = 0) => {

  if (input_box.value === "") {
    incorrect.classList.remove("invisible")

  } else {
    const to_save_todo = await saveTodo(user_id, todo, completed)
    const todo_task = createTodo(user_id, todo)

    user_data.todos.push({
      id: to_save_todo.id,
      user_id: user_id,
      todo: todo,
      completed: completed
    })
    list_container.append(todo_task)
  }
}
add_button.addEventListener("click", () => {
  addTodo(user_data.user_id, input_box.value)
})