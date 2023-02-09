import { createListenerMiddleware } from "@reduxjs/toolkit";
import { toggleChangeAction, updateWithAction } from "../Reducer/reducer";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: toggleChangeAction,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(updateWithAction(action.payload));
  },
});

export default listenerMiddleware;
