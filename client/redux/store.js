import { configureStore } from '@reduxjs/toolkit'
import user from './slices/user-slice'

export const store = configureStore({
    reducer: {
        user,
    }
})