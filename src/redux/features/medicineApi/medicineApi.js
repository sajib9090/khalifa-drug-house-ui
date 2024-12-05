import { baseApi } from "../api/baseApi";

const medicineApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMedicines: builder.query({
      query: ({
        searchValue,
        limitValue,
        pageValue,
        sortPrice,
        stockValue,
        company,
        group,
        category,
      }) => {
        const params = new URLSearchParams();

        if (stockValue) params.append("stockValue", stockValue);
        if (searchValue) params.append("search", searchValue);
        if (limitValue) params.append("limit", limitValue);
        if (pageValue) params.append("page", pageValue);
        if (sortPrice) params.append("sortPrice", sortPrice);
        if (company) params.append("company", company);
        if (group) params.append("group", group);
        if (category) params.append("category", category);

        const url = `/medicines${
          params.toString() ? `?${params.toString()}` : ""
        }`;

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Medicine"],
    }),
    addNewMedicine: builder.mutation({
      query: (data) => ({
        url: "/medicines/medicine-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Medicine"],
    }),
    removeMedicine: builder.mutation({
      query: (id) => ({
        url: `/medicines/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Medicine"],
    }),
  }),
});

export const {
  useAddNewMedicineMutation,
  useGetAllMedicinesQuery,
  useRemoveMedicineMutation,
} = medicineApi;
