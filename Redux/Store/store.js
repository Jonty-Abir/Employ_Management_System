import { configureStore } from "@reduxjs/toolkit";
import listnerMiddleware from "../middleware/listner";
import Reducer from "../Reducer/reducer";

const store = configureStore({
  reducer: {
    app: Reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listnerMiddleware.middleware),
});

export { store };

