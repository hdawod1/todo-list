import { combineReducers } from "@reduxjs/toolkit"
import todoSlice from "../features/task/todoSlice"

export const rootReducer = combineReducers({
    todo: todoSlice,
})
