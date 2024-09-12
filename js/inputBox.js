const inputBox = {
    _subscriptionsForSubmit: [],
    _content: NewReactiveValue(
        //NewLocalStoredValue("input-box", "")
        NewUrlArgValue("input-box", "")
    ),
    content: function () {
        return this._content.value()
    },
    insert: function (value) {
        this._content.update(value)
    },
    submit: function () {
        const submittedValue = this._content.value()
        this._content.update("")
        this._subscriptionsForSubmit.forEach(subscriber => {
            subscriber(submittedValue)
        });
    },
    onSubmitted: function (subscriber) {
        this._subscriptionsForSubmit.push(subscriber)
    }
}


const input = document.getElementById("input-text")
input.addEventListener("change", () => inputBox.insert(input.value))
inputBox.onSubmitted(() => input.value = "")
input.value = inputBox.content()


const button = document.getElementById("add-item")
button.addEventListener("click", () => inputBox.submit())