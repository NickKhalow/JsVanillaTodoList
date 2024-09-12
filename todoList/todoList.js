function NewTodoList() {
    return {
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
}

function NewViewTodoList(todoList, listRootHtml) {
    const itemTemplate = document.getElementById("item-template")

    itemTemplate.parentNode.removeChild(itemTemplate)

    todoList.onContentUpdated((newContent) => {
        console.log(`Content updated: ${newContent}`)
        listRootHtml.innerHTML = ''
        newContent.forEach(item => {
            const newTemplate = itemTemplate.cloneNode(true)

            const newSpan = newTemplate.querySelector("#item-title")
            newSpan.innerHTML = item

            const button = newTemplate.querySelector("#item-delete")
            button.onclick = () => {
                const index = newContent.indexOf(item)
                todoList.remove(index)
            }

            listRootHtml.appendChild(newTemplate)
        });
    })

    return todoList
}

//
