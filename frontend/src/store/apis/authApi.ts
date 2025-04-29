import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setKey, logout } from "../slices/authSlice";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  message: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

interface UserResponse {
  username: string;
  email: string;
  [key: string]: any;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      invalidatesTags: ["User"],
      query: (credentials) => ({
        url: "/auth/login/",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          
        } catch (err) {
          console.error("Login failed:", err)
        }
      },
    }),
    getCurrentUser: builder.query<UserResponse, void>({
      providesTags: ["User"],
      query: () => ({
        url: "/users/me/",
        method: "GET",
      }),
    }),
    register: builder.mutation({
        invalidatesTags: ["User"],
        query: (credentials) => ({
          url: `/auth/registration/`, 
          method: "POST",
          body: credentials,
        }),
      }),
    
    logout: builder.mutation<void, void>({
      invalidatesTags: ["User"],
      query: () => ({
        url: "/auth/logout/",
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
  useLogoutMutation,
  useRegisterMutation, 
  useGetCurrentUserQuery,
} = authApi;
