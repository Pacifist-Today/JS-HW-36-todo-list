"use strict"

void function () {
    const payload = {
        todoForm: `#todoForm`,
        todoItems: `#todoItems`
    }

    const app = controller(model(),view(),payload)
} ()