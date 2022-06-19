"use strict"

function view () {

    const createTodoItem = (data) => {
        const createWrapper = document.createElement('div')
        createWrapper.classList.add(`col-4`)
        createWrapper.setAttribute(`data-todo-id`, data.id)

        createWrapper.innerHTML = `<div class="taskWrapper">
                <div class="taskHeading">${data.title}</div>
                <div class="taskDescription">${data.description}</div>
                <button class="btn btn-danger mt-3 remove">Remove</button>
            </div>`
        return createWrapper
    }


    return {
        todoFormSelector: null,
        todoItemsSelector: null,

        clearForm (){
            this.todoFormSelector.reset()
        },

        removeTodoItem(id) {
            document.querySelector(`[data-todo-id="${id}"]`).remove()
        },

        renderTodoItem (data) {
            const todoNote = createTodoItem(data)
            this.todoItemsSelector.append(todoNote)
        },

        init (todoFormSelector, todoItemsSelector) {
            this.todoFormSelector = todoFormSelector
            this.todoItemsSelector = todoItemsSelector

        }
    }
}