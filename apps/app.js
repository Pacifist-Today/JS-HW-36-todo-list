"use strict"

void function () {
    const payload = {
        todoForm: `#todoForm`,
        todoItems: `#todoItems`,
        todoStatus: `#todoStatus`
    }

    const app = controller(model(),view(),payload)
} ()