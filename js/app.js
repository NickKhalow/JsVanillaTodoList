const inputBox = NewViewInputBox(
    NewInputBox(),
    document.getElementById("input-text"),
    document.getElementById("add-item")
)

const todoList = NewViewTodoList(
    NewTodoList(),
    document.getElementById("todolist-root")
)

inputBox.onSubmitted((item) => todoList.add(item))