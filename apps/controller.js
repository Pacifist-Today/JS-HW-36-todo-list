"use strict"

function controller (model, view, payload) {
    const todoForm = payload.todoForm
    const todoItems = payload.todoItems
    const todoFormSelector = document.querySelector(todoForm)
    const todoItemsSelector = document.querySelector(todoItems)
    view.init (todoFormSelector, todoItemsSelector)
    model.init (todoForm)

    const fetchForm = (inputs) => {
        let data = null
        if (inputs instanceof NodeList) {
            data = Array.from(inputs)
        }

        return data.reduce((acc, item) => {
            acc[item.name] = item.value
            return acc
        }, {})

    }

    const submitHandler = event => {
        event.stopPropagation()
        event.preventDefault()

        const inputs = document.querySelectorAll(`input, textarea`)
        const data = model.setData(fetchForm(inputs))

        if (!data.success) throw Error ("empty data")

        view.renderTodoItem(data.savedData)
        view.clearForm()
    }

    const loadHandler = () => {
        const todoItems = model.getData()
        if (!model.getData()) return

        todoItems.forEach(item => {
            view.renderTodoItem(item)
        })
    }
    
    const removeTodoHandler = event => {
        event.stopPropagation()
        if (!event.target.classList.contains(`remove`)) return
        let todoId = event.target.closest(`[data-todo-id]`).getAttribute(`data-todo-id`)

        todoId = Number(todoId)
        model.removeTodoItem(todoId)
        view.removeTodoItem(todoId)
    }

    todoFormSelector.addEventListener(`submit`, submitHandler)

    window.addEventListener(`DOMContentLoaded`, loadHandler)

    todoItemsSelector.addEventListener(`click`, removeTodoHandler)

    return {

    }
}