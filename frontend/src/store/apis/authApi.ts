import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../index"; // Adjust if your store file is named differently
import { setKey, logout } from "../slices/authSlice";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  key: string;
}

interface UserResponse {
  username: string;
  email: string;
  [key: string]: any;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/auth",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.key;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      invalidatesTags: ["User"],
      query: (credentials) => ({
        url: "/login/",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setKey({ key: data.key }));
        } catch (err) {
          // Optional: toast, console.error, or silent fail
        }
      },
    }),
    getUser: builder.query<UserResponse, void>({
      providesTags: ["User"],
      query: () => ({
        url: "/user/",
        method: "GET",
      }),
    }),
    register: builder.mutation({
        invalidatesTags: ["User"],
        query: (credentials) => ({
          url: `/registration/`, // <-- make sure this matches your Django/Djoser/DRF path
          method: "POST",
          body: credentials,
        }),
      }),
    
    logout: builder.mutation<void, void>({
      invalidatesTags: ["User"],
      query: () => ({
        url: "/logout/",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch }) {
        dispatch(logout());
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserQuery,
  useLogoutMutation,
  useRegisterMutation, 
} = authApi;
