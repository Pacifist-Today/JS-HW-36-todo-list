"use strict"

function view () {

    const createTodoItem = (data) => {
        const createWrapper = document.createElement('div')
        createWrapper.classList.add(`col-4`)
        createWrapper.setAttribute(`data-todo-id`, data.id)

        createWrapper.innerHTML = `<div class="taskWrapper">
                <div class="taskHeading">${data.title}</div>
                <div class="taskDescription">${data.description}</div>
                <div class="taskStatus mt-3" id="taskStatus">
                    <label class="form-label mr-3">Status</label>
                    <select name="status" id="todoSelect" class="form-select" >
                        <option value="noStatus">no-status</option>
                        <option value="pending">pending</option>
                        <option value="complete">completed</option>
                    </select>
                </div>
                <button class="btn btn-danger mt-3 remove">Remove</button>
            </div>`
        return createWrapper
    }


    return {
        todoFormSelector: null,
        todoItemsSelector: null,
        todoStatusSelector: null,

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

        init (todoFormSelector, todoItemsSelector, todoStatusSelector) {
            this.todoFormSelector = todoFormSelector
            this.todoItemsSelector = todoItemsSelector
            this.todoStatusSelector = todoStatusSelector
        }
    }
}