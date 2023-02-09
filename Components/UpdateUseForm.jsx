import { toast } from "react-hot-toast";
import { BiBrush } from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { getAllUser, getUser, updateUser } from "../library/helper";

/***_______  Component   ________**/

function UpdateUserForm({ state, disPatch }) {
  const userId = useSelector((state) => state?.app.client.formId);
  /***_______  Onsubmit Fun..   ________**/
  const { isError, isLoading, data, error } = useQuery(["user", userId], () =>
    getUser(userId)
  );

  /***_______     ________**/
  const queryClient = useQueryClient();
  const updateMutation = useMutation(
    (newDataToUpdate) => updateUser(userId, newDataToUpdate),
    {
      // 
      onSuccess: async (currentData) => {
        toast.success("Updated Successfull..🔥 🚀");
        queryClient.prefetchQuery("allUsers", (oldData)=> getAllUser());
        // queryClient.setQueryData("allUsers",(oldData)=>getAllUser())
      },
      onError: (error) => {
        if (error?.response?.data?.error)
          return toast.error(`${error?.response?.data?.error}`);
        toast.error(`Failed!`);
      },
    }
  );
  /***_______     ________**/
  if (isLoading) return <h2>Loading....</h2>;
  if (isError)
    return <code className="text-red-400 font-semibold text-2xl">{error}</code>;
  const { _id, avatar, date, email, firstname, lastname, sallery, status } =
    data?.user;
  /***_______  On Submit function   ________**/
  const onSubmitFun = async (event) => {
    event.preventDefault();
    // const promise = updateUser(_id, state);
    // toast.promise(promise, {
    //   loading: "Updateing...",
    //   success: "Successfully Update.🔥 🚀 ",
    //   error: "Faild! 🙄 ",
    // });

    await updateMutation.mutate({ ...state });
    return;
  };
  return (
    <>
      <br />
      <form className="grid grid-cols-2 w-4/6 gap-4" onSubmit={onSubmitFun}>
        <div className="input-type">
          <input
            type="text"
            name="firstname"
            onChange={disPatch}
            defaultValue={firstname}
            className="border w-full px-5 py-3 focus: outline-none rounded-md "
            placeholder="firstname"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            name="lastname"
            onChange={disPatch}
            defaultValue={lastname}
            className="border w-full px-5 py-3 focus: outline-none rounded-md "
            placeholder="lastnames"
          />
        </div>
        <div className="input-type">
          <input
            type="email"
            name="email"
            onChange={disPatch}
            defaultValue={email}
            className="border w-full px-5 py-3 focus: outline-none rounded-md "
            placeholder="email"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            name="sallery"
            onChange={disPatch}
            defaultValue={sallery}
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
              value={"Active"}
              onChange={disPatch}
              id="radioDefault"
              defaultChecked={status == "Active"}
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
              value={"Inactive"}
              onChange={disPatch}
              defaultChecked={status !== "Active"}
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
                defaultValue={date}
                className="border w-full px-5 py-3 focus: outline-none rounded-md "
              />
            </div>
          </div>
        </div>
        <button className="flex justify-center text-md w-2/6 bg-orange-500 text-white px-4 py-2 gap-3 border rounded-md hover:bg-gray-50 hover:border-yellow-500 hover:text-yellow-500">
          {" "}
          Update{" "}
          <span>
            <BiBrush className="px-1" size={28} />
          </span>
        </button>
      </form>
    </>
  );
}

export default UpdateUserForm;
