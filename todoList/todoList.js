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

function NewItemViewFactory(listRootHtml) {
    const itemTemplate = document.getElementById("item-template")
    itemTemplate.parentNode.removeChild(itemTemplate)

    return {
        newItemView: () => {
            const element = itemTemplate.content.cloneNode(true)
            element._propertyTitle = element.querySelector("#item-title")
            element._propertyButton = element.querySelector("#item-delete")
            element._propertySelfIndex = -1
            element._propertyButton.onclick = () => todoList.remove(element._propertySelfIndex)

            element.applyItem = (item, index) => {
                element._propertyTitle.innerHTML = item
                element._propertySelfIndex = index
            }

            listRootHtml.appendChild(element)
            return element
        }
    }
}

function NewViewTodoList(todoList, listRootHtml) {
    const factory = NewItemViewFactory(listRootHtml)

    todoList.onContentUpdated((newContent) => {
        console.log(`Content updated: ${newContent}`)

        while (listRootHtml.firstChild) {
            const child = listRootHtml.lastChild
            listRootHtml.removeChild(child)
        }

        newContent.forEach(item => {
            const itemView = factory.newItemView()
            itemView.applyItem(item, newContent.indexOf(item))
        });
    })

    return todoList
}