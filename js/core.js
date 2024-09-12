function NewUrlArgValue(key, defaultValue) {
    return {
        _defalutValue: defaultValue,
        _key: key,
        value: function () {
            const url = new URL(window.location.href)
            const value = url.searchParams.get(this._key)
            if (value == null || value == undefined) return this._defalutValue
            return value
        },
        update: function (newValue) {
            const url = new URL(window.location.href)
            url.searchParams.set(this._key, newValue)
            window.history.replaceState({}, '', url);
        }
    }
}

function NewLocalStoredValue(key, defalutValue) {
    return {
        _defalutValue: defalutValue,
        _key: key,
        value: function () {
            const rawData = localStorage.getItem(this._key)
            if (rawData == "undefined") return this.defalutValue
            const value = JSON.parse(rawData)
            if (value == null) return this._defalutValue
            return value
        },
        update: function (newValue) {
            const parsedValue = JSON.stringify(newValue)
            localStorage.setItem(this._key, parsedValue)
        }
    }
}

function NewReactiveValue(innerValue) {
    return {
        _subscriptions: [],
        _value: innerValue,
        value: function () {
            return this._value.value()
        },
        update: function (newValue) {
            this._value.update(newValue)
            this._subscriptions.forEach(subscriber => {
                subscriber(newValue)
            });
        },
        // subscriber is a function that accepts this type of value
        subscribe: function (subscriber) {
            this._subscriptions.push(subscriber)
        }
    }
}