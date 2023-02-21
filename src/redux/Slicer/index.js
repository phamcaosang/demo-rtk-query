import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const indexApi = createApi({
    reducerPath: 'app',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://63e65c2083c0e85a86920ae0.mockapi.io/api/v1'
    }),
    tagTypes: ["User"],
    endpoints: () => ({}),
})