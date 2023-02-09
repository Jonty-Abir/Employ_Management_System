import { BiPlus } from "react-icons/bi";
import { useMutation, useQueryClient } from "react-query";
import { addUser, getAllUser } from "../library/helper";
import Bug from "./Bug";
import Success from "./Success";

function AddUserForm({ state, disPatch }) {
  const queryClient = useQueryClient();

  /***_______   reactQuery useMutation ________**/
  const addMutation = useMutation(addUser, {
    onSuccess: async () => {
      await queryClient.prefetchQuery("allUsers", getAllUser);
      // toast.success("Success.🔥 🚀 ");
    },
  });
  /***_______   OnSubmit Function  ________**/

  const onSubmitFun = async (event) => {
    event.preventDefault();

    const { date, email, firstname, lastname, sallery, status } = state;
    const model = {
      ...state,
      avatar: `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * 20
      )}.jpg`,
    };
    await addMutation.mutate(model);
  };
  if (addMutation.isError) return <Bug message={"Error was Accure!"}></Bug>;
  if (addMutation.isSuccess)
    return <Success message={"Add SuccessFull🔥 🚀"}></Success>;
  if (addMutation.isLoading) return <h2>Loading...</h2>;
  return (
    <>
      <br />

      <form className="grid grid-cols-2 w-4/6 gap-4" onSubmit={onSubmitFun}>
        <div className="input-type">
          <input
            type="text"
            name="firstname"
            onChange={disPatch}
            className="border w-full px-5 py-3 focus: outline-none rounded-md "
            placeholder="firstname"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            name="lastname"
            onChange={disPatch}
            className="border w-full px-5 py-3 focus: outline-none rounded-md "
            placeholder="lastnames"
          />
        </div>
        <div className="input-type">
          <input
            type="email"
            name="email"
            onChange={disPatch}
            className="border w-full px-5 py-3 focus: outline-none rounded-md "
            placeholder="email"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            name="sallery"
            onChange={disPatch}
            className="border w-full px-5 py-3 focus: outline-none rounded-md "
            placeholder="sallery"
          />
        </div>
        <div className="flex gap-8 items-center">
          {/* active radio */}
          <div className="form-check">
            <input
              type="radio"
              name="status"
              onChange={disPatch}
              value={"Active"}
              id="radioDefault"
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-blue-700 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 align-top bg-no-repeat  bg-center  bg-contain float-left mr-2"
            />
            <label
              htmlFor="radioDefault"
              className="inline-block text-gray-800"
            >
              Active
            </label>
          </div>
          {/* inactive radio */}

          <div className="form-check">
            <input
              type="radio"
              name="status"
              onChange={disPatch}
              value={"Inactive"}
              id="radioDefault1"
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-blue-700 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 align-top bg-no-repeat  bg-center  bg-contain float-left mr-2"
            />

            <label
              htmlFor="radioDefault1"
              className="inline-block text-gray-800"
            >
              Inactive
            </label>
          </div>
        </div>
        <div className="flex gap-10">
          <div className="flex w-full">
            <div className="input-type">
              <input
                type="date"
                name="date"
                onChange={disPatch}
                className="border w-full px-5 py-3 focus: outline-none rounded-md "
              />
            </div>
          </div>
        </div>
        <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 gap-3 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
          {" "}
          Add{" "}
          <span>
            <BiPlus className="px-1" size={28} />
          </span>
        </button>
      </form>
    </>
  );
}

export default AddUserForm;
