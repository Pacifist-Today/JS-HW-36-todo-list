"use strict"

function controller (model, view, payload) {
    const todoForm = payload.todoForm
    const todoItems = payload.todoItems
    const todoStatus = payload.todoStatus
    const todoFormSelector = document.querySelector(todoForm)
    const todoItemsSelector = document.querySelector(todoItems)
    const todoStatusSelector = document.querySelector(todoStatus)
    view.init (todoFormSelector, todoItemsSelector, todoStatusSelector)
    model.init (todoForm)

    const fetchForm = (inputs) => {
        let data = null
        if (inputs instanceof NodeList) {
            data = Array.from(inputs)
            console.log(data)
        }

        return data.reduce((acc, item) => {
            acc[item.name] = item.value
            return acc
        }, {})

    }

    const submitHandler = event => {
        event.stopPropagation()
        event.preventDefault()

        const inputs = document.querySelectorAll(`input, textarea, select`)
        const data = model.setData(fetchForm(inputs))

        if (!data.success) throw Error ("empty data")

        view.renderTodoItem(data.savedData)
        view.clearForm()
    }

    // working loader without iterators and generator

    // const loadHandler = () => {
    //     const todoItems = model.getData()
    //     if (!model.getData()) return
    //
    //     todoItems.forEach(item => {
    //         view.renderTodoItem(item)
    //     })
    // }

    // Iterators and generator

    const loadHandler = () => {
        const todoItems = model.getData()
        let todoItemsObj = {...todoItems}
        let count = 0
        let itr = Object.values(todoItemsObj[count++])[Symbol.iterator]()

        let title = itr.next()
        let description = itr.next()
        let id = itr.next()
        let status = itr.next()

        if (title.value.length >= 1) {
            console.log(title)
        }
            else return
        if (description.value.length >= 1){
            console.log(description)
        }
            else return;
        if (typeof +id.value === `number`) {
            console.log(id)
        }
            else return;
        if (status.value === `noStatus` || status.value === `pending` || status.value === `completed`) {
            console.log(status)
        }   else return;

        let itrRender = Object.values(todoItemsObj)[Symbol.iterator]()

        function* generator (obj) {
            for (let card in obj) {
                console.log(obj[card])
                view.renderTodoItem(obj[card])
            }
        }

        let gen = generator(todoItemsObj)
        gen.next()
    }

    const removeTodoHandler = event => {
        event.stopPropagation()
        if (!event.target.classList.contains(`remove`)) return
        let todoId = event.target.closest(`[data-todo-id]`).getAttribute(`data-todo-id`)

        todoId = Number(todoId)
        model.removeTodoItem(todoId)
        view.removeTodoItem(todoId)
    }

    const updateHandler = (event) => {
        event.stopPropagation()
        const formSelect = event.target.classList.contains(`form-select`)
        if (!formSelect) return

        let id = event.target.closest(`[data-todo-id]`).getAttribute(`data-todo-id`)
        id = Number(id)

        model.updateTodoItem(id, event)
        view.updateTodoItem(model.getData())
    }

    todoFormSelector.addEventListener(`submit`, submitHandler)

    window.addEventListener(`DOMContentLoaded`, loadHandler)

    todoItemsSelector.addEventListener(`click`, removeTodoHandler)

    todoItemsSelector.addEventListener(`change`, updateHandler)

    return {

    }
}