import { useReducer } from "react";
import { useSelector } from "react-redux";
import AddUserForm from "./AddUserForm";
import UpdateUserForm from "./UpdateUseForm";
/***_______  Reducer function for useReducer   ________**/

const reducer = (initialState = {}, action) => {
  return {
    ...initialState,
    [action.target.name]: action.target.value,
  };
};

function Form() {
  /***_______  useReducer   ________**/

  const [state, disPatch] = useReducer(reducer, {});
  const formId = useSelector((sate) => sate.app.client.formId);
  return (
    <>
      {formId
        ? UpdateUserForm({ state, disPatch })
        : AddUserForm({ state, disPatch })}
    </>
  );
}

export default Form;
