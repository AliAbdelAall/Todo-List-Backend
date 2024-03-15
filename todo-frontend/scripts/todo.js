const input_box = document.getElementById("input-box")
const list_container = document.getElementById("list-container")
const add_button = document.getElementById("add-button")

const user_data = JSON.parse(localStorage.getItem("user_data"));

const createTodo = (todo, id) => {
  const todo_wrapper = document.createElement("div")
  todo_wrapper.innerHTML = todo
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
  if (user_data.status === "success") {
    const { todos } = user_data
    for (i = 0; i < todos.length; i++) {
      const todo = createTodo(todos[i].todo, todos[i].user_id)
      console.log(todo, typeof (todo))
      console.log(todos[i].todo, todos[i].user_id)
      list_container.append(todo)
    }
  }
}

loadTodos()

add_button.addEventListener("click", function () {
})

list_container.forEach(element => {
  element.addEventListener("click", function (element) {

  })
})
