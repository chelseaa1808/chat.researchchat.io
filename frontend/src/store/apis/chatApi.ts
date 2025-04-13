import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../index"; // Adjust if needed

interface Conversation {
  uuid: string;
  slug: string;
  external_id?: string;
}

interface Message {
  id: number;
  text: string;
  actor: "user" | "bot";
  timestamp?: string;
  created?: string;
}

interface SendMessagePayload {
  uuid: string;
  text: string;
}

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.key;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Messages", "Bots", "Conversations"],
  endpoints: (builder) => ({
    // Bots
    getBots: builder.query<any[], void>({
      query: () => `/bots/`,
      providesTags: ["Bots"],
    }),

    // Conversations
    getConversations: builder.query<any[], string>({
      query: (botName) => `/bots/${botName}`,
      providesTags: ["Conversations"],
    }),

    getConversation: builder.query<any, string>({
      query: (conversationId) => `/conversations/${conversationId}/`,
    }),

    createConversation: builder.mutation<any, Conversation>({
      query: ({ slug, external_id }) => {
        let url = `/${slug}/new/`;
        if (external_id !== undefined) {
          url += `?uid=${external_id}`;
        }
        return {
          url,
          method: "GET",
        };
      },
      invalidatesTags: ["Conversations"],
    }),

    // Messages
    getMessages: builder.query<Message[], string>({
      query: (uuid) => `/conversations/${uuid}/messages/`,
      providesTags: (result, error, uuid) => [{ type: "Messages", id: uuid }],
    }),

    sendMessage: builder.mutation<any, SendMessagePayload>({
      query: ({ uuid, text }) => ({
        url: `/send_message/`,
        method: "POST",
        body: {
          conversation_id: uuid,
          text,
        },
      }),
      invalidatesTags: (result, error, { uuid }) => [
        { type: "Messages", id: uuid },
      ],
      async onQueryStarted({ uuid, text }, { dispatch, queryFulfilled }) {
        const optimisticMessage: Message = {
          id: Date.now(),
          text,
          actor: "user",
          created: new Date().toISOString(),
        };

        const patchResult = dispatch(
          chatApi.util.updateQueryData("getMessages", uuid, (draft) => {
            draft.push(optimisticMessage);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetBotsQuery,
  useGetConversationsQuery,
  useGetConversationQuery,
  useCreateConversationMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
} = chatApi;


