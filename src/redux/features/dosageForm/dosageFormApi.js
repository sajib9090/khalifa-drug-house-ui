import { baseApi } from "../api/baseApi";

const dosageFormApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDosageForms: builder.query({
      query: ({ searchValue, limitValue, pageValue }) => {
        const params = new URLSearchParams();

        if (searchValue) params.append("search", searchValue);
        if (limitValue) params.append("limit", limitValue);
        if (pageValue) params.append("page", pageValue);

        const url = `/dosage-forms${
          params.toString() ? `?${params.toString()}` : ""
        }`;

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["DosageForm"],
    }),
    addNewDosageForm: builder.mutation({
      query: (data) => ({
        url: "/dosage-forms/dosage-form-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DosageForm"],
    }),
    removeDosageForm: builder.mutation({
      query: (id) => ({
        url: `/dosage-forms/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DosageForm"],
    }),
  }),
});

export const {
  useAddNewDosageFormMutation,
  useGetAllDosageFormsQuery,
  useRemoveDosageFormMutation,
} = dosageFormApi;
