"use strict"

function model () {
    return {
        dbName: null,
        todoID: null,

        dbKey (key) {
            if (!key.trim()) throw new Error ("no selector")
            this.dbName = key
        },

        getData () {
            return JSON.parse(localStorage.getItem(this.dbName))
        },

        setData(data) {
            let copyData = structuredClone(data)
            let response = null
            copyData.id = this.todoID

            const checkingForm = this.getData()
            if (!checkingForm){
                let todos = []
                todos.push(copyData)
                localStorage.setItem(this.dbName, JSON.stringify(todos))
            }   else {
                checkingForm.push(copyData)
                localStorage.setItem(this.dbName, JSON.stringify(checkingForm))
            }

            try {
                response = {
                    success: true,
                    savedData: copyData
                }
                this.todoID++
            }   catch (error) {
                response = {
                    success: false,
                    errors: error
                }
            }
            return response

        },

        removeTodoItem (id) {
            const data = this.getData()
            const deletingTodo = data.filter(todoItem => todoItem.id !== id)
            console.log(deletingTodo)

            if (deletingTodo.length) {
                localStorage.setItem(this.dbName, JSON.stringify(deletingTodo))
            }   else    {
                localStorage.removeItem(this.dbName)
            }
        },

        init (todoForm) {
            this.dbKey(todoForm)
            const checkingForm = this.getData()
            this.todoID = checkingForm ? checkingForm[checkingForm.length-1].id + 1 : 1;
        }
    }
}