import { configureStore } from '@reduxjs/toolkit'
import postReducer from '../reducer/postSlice'

export const store = configureStore({
    reducer: {
        post: postReducer
    },
    devTools: false
})