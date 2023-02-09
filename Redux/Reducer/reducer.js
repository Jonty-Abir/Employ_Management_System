import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  client: { formToggle: false, formId: undefined, deleteId: null },
};

const reducerSclice = createSlice({
  name: "CRUD_APP",
  initialState,
  reducers: {
    toggleChangeAction: (state) => {
      state.client.formToggle = !state.client.formToggle;
    },
    updateWithAction: (state, { payload }) => {
      state.client.formId = payload;
    },
    deleteAction: (state, action) => {
      state.client.deleteId = action.payload;
    },
  },
});

export const { toggleChangeAction, updateWithAction, deleteAction } =
  reducerSclice.actions;
export default reducerSclice.reducer;
