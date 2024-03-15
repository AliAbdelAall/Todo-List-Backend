const input_box = document.getElementById("input-box")
const list_container = document.getElementById("list-container")
const button = document.getElementById("button")

button.addEventListener("click", function () {
  //   if (input_box.value === '') {
  //     alert("you must add a task first")

  // } else {
  const todo = document.createElement("div")
  todo.innerHTML = input_box.value
  todo.className = "flex space-between wrap todo"
  list_container.append(todo)

  const delete_icon = document.createElement("i")
  delete_icon.className = "fa-solid fa-x"
  todo.append(delete_icon)
  const edit_icon = document.createElement("i")
  edit_icon.className = "fa-regular fa-pen-to-square"
  todo.append(edit_icon)
  // }
  input_box.value = ""
  saveData()
})

list_container.addEventListener("click", function (element) {
  if (element.target.classList.contains("todo")) {
    element.target.classList.toggle("checked")
    saveData()

  } else if (element.target.tagName === "I") {
    element.target.parentElement.remove()
    saveData()
  }
})

function saveData() {
  localStorage.setItem("data", list_container.innerHTML)
}

function loadData() {
  list_container.innerHTML = localStorage.getItem("data")
}

loadData()