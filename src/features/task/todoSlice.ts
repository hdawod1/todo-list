import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface Todo{
    id: string,
    title: string,
    description: string
}

interface TodoState {
    todos: Todo[]
}

const initialState: TodoState = {
    todos: []
}

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
            const newTodo: Todo = {
                id: action.payload.id,
                title: action.payload.title,
                description: action.payload.description
            }
            state.todos = [...state.todos, newTodo]
        },
        deleteTodo: (state, action: PayloadAction<Todo>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
        },
        updateTodoTitle: (state, action) => {
            state.todos.map(todo => {
                todo.id === action.payload.id ? todo.title = action.payload.title : todo
            })
        },
        updateTodoDescription: (state, action) => {
            state.todos.map(todo => {
                todo.id === action.payload.id ? todo.description = action.payload.description : todo
            })
        }
    }
})

export const {addTodo, deleteTodo, updateTodoTitle, updateTodoDescription} = todoSlice.actions
export default todoSlice.reducer