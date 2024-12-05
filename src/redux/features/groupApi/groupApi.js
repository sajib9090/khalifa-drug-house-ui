import { baseApi } from "../api/baseApi";

const groupApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllGroups: builder.query({
      query: ({ searchValue, limitValue, pageValue }) => {
        const params = new URLSearchParams();

        if (searchValue) params.append("search", searchValue);
        if (limitValue) params.append("limit", limitValue);
        if (pageValue) params.append("page", pageValue);

        const url = `/groups${
          params.toString() ? `?${params.toString()}` : ""
        }`;

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Group"],
    }),
    addNewGroup: builder.mutation({
      query: (data) => ({
        url: "/groups/group-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Group"],
    }),
    removeGroup: builder.mutation({
      query: (id) => ({
        url: `/groups/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Group"],
    }),
  }),
});

export const {
  useAddNewGroupMutation,
  useGetAllGroupsQuery,
  useRemoveGroupMutation,
} = groupApi;
