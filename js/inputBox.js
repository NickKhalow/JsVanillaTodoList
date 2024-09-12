function NewInputBox() {
    return {
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
}

function NewViewInputBox(inputBox, inputHtml, buttonHtml) {
    inputHtml.addEventListener("change", () => inputBox.insert(inputHtml.value))
    inputBox.onSubmitted(() => inputHtml.value = "")
    inputHtml.value = inputBox.content()
    buttonHtml.addEventListener("click", () => inputBox.submit())
    return inputBox
}
