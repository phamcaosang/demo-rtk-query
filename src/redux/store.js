import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { indexApi } from './Slicer'

export const store = configureStore({
    reducer: {
        [indexApi.reducerPath]: indexApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(indexApi.middleware),
})

setupListeners(store.dispatch)