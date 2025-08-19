import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Bookmark {
  id: string;
  eventID: string;
  createdAt: string;
}
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  errors: any | null;
}
type bookmarkResponse = ApiResponse<Bookmark>

export const bookmarkApi = createApi({
  reducerPath: "bookmarkApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://akil-backend.onrender.com",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Bookmarks"],
  endpoints: (builder) => ({
    // GET /bookmarks
    getBookmarks: builder.query<bookmarkResponse, void>({
      query: () => "/bookmarks",
      providesTags: ["Bookmarks"],
    }),

    // POST /bookmarks/:eventID
    addBookmark: builder.mutation<{ message: string }, string>({
      query: (eventId) => ({
        url: `/bookmarks/${eventId}`,
        method: "POST",
      }),
      invalidatesTags: ["Bookmarks"],
    }),

    // DELETE /bookmarks/:eventID
    removeBookmark: builder.mutation<{ message: string }, string>({
      query: (eventId) => ({
        url: `/bookmarks/${eventId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bookmarks"],
    }),
  }),
});

export const {
  useGetBookmarksQuery,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} = bookmarkApi;
