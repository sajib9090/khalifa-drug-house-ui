import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSellItems: [],
};

export const sellLogSlice = createSlice({
  name: "sellLog",
  initialState,
  reducers: {
    addSellLog: (state, action) => {
      const data = action.payload;

      const existingItem = state.selectedSellItems?.find(
        (item) => item?._id === data?._id
      );

      if (existingItem) {
        existingItem.s_quantity = data?.s_quantity;
      } else {
        state.selectedSellItems.push({
          ...data,
          s_quantity: data?.s_quantity,
        });
      }
    },
    removeSingleItem: (state, action) => {
      const { id } = action.payload;

      state.selectedSellItems = state.selectedSellItems?.filter(
        (item) => !(item._id === id)
      );
    },
    removeAllItems: (state) => {
      state.selectedSellItems = [];
    },
  },
});

export const { addSellLog, removeSingleItem, removeAllItems } =
  sellLogSlice.actions;

export default sellLogSlice.reducer;

export const selectedItems = (state) => state.sellLog.selectedSellItems;
