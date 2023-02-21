import { indexApi } from './index'

const extendedApi = indexApi.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => ({
                url: "/users",
                method: "GET",
            }),
            providesTags: ["User"],
        }),
        addUser: build.mutation({
            query: (data) => ({
                url: "/users",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["User"],
        }),
        editUserById: build.mutation({
            query: (data) => ({
                url: `/users/${data.id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["User"],
        }),
        deleteUserById: build.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["User"],
        }),
    }),
    overrideExisting: false,
})

export const { useGetUsersQuery, useAddUserMutation, useEditUserByIdMutation, useDeleteUserByIdMutation } = extendedApi;