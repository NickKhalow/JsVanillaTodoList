const todoList = {
    _subscriptions: [],
    _content: NewLocalStoredValue("todo-items", []),
    _notifyAboutUpdate: function () {
        const content = this._content.value()
        this._subscriptions.forEach(subscriber => {
            subscriber(content)
        });
    },
    add: function (element) {
        const array = this._content.value()
        array.push(element)
        this._content.update(array)
        this._notifyAboutUpdate()
    },
    remove: function (index) {
        const array = this._content.value()
        array.splice(index, 1)
        this._content.update(array)
        this._notifyAboutUpdate()
    },
    onContentUpdated: function (subscriber) {
        this._subscriptions.push(subscriber)
        const content = this._content.value()
        subscriber(content)
    }
}

const contentUI = document.getElementById("list-content")
todoList.onContentUpdated((newContent) => {
    console.log(`Content updated: ${newContent}`)
    contentUI.innerHTML = ''
    newContent.forEach(item => {

        const newSpan = document.createElement("span")
        newSpan.innerHTML = item

        const button = document.createElement("button")
        button.innerHTML = "Delete"
        button.onclick = () => {
            const index = newContent.indexOf(item)
            todoList.remove(index)
        }

        const root = document.createElement("div")
        root.appendChild(newSpan)
        root.appendChild(button)

        contentUI.appendChild(root)
    });
})
//
