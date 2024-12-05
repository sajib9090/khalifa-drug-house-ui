import { baseApi } from "../api/baseApi";

const companyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCompanies: builder.query({
      query: ({ searchValue, limitValue, pageValue }) => {
        const params = new URLSearchParams();

        if (searchValue) params.append("search", searchValue);
        if (limitValue) params.append("limit", limitValue);
        if (pageValue) params.append("page", pageValue);

        const url = `/companies${
          params.toString() ? `?${params.toString()}` : ""
        }`;

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Company"],
    }),
    addNewCompany: builder.mutation({
      query: (data) => ({
        url: "/companies/company-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Company"],
    }),
    removeCompany: builder.mutation({
      query: (id) => ({
        url: `/companies/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Company"],
    }),
  }),
});

export const {
  useAddNewCompanyMutation,
  useGetAllCompaniesQuery,
  useRemoveCompanyMutation,
} = companyApi;
