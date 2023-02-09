import Image from "next/image";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { useQuery } from "react-query";
import uniqid from "uniqid";
// import data from "../DataBase/data";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../library/helper";
import {
  deleteAction,
  toggleChangeAction,
  updateWithAction
} from "../Redux/Reducer/reducer";

function Table() {
  /***_______  access central store   ________**/

  const { data, isError, isLoading, error } = useQuery("allUsers", getAllUser);
  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2> Error was accure..</h2>;
  return (
    <>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-800">
            <th className="px-16 py-2">
              <span className="text-gray-200">Name</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-200">Email</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-200">Salary</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-200">Birthday</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-200">Status</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-200">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-200">
          {data?.map((obj, inx) => {
            return <Tr {...obj} key={uniqid() + inx} />;
          })}
        </tbody>
      </table>
    </>
  );
}
/***_______  Create TABLE ROW funtion   ________**/

function Tr({ _id, firstname, avatar, email, sallery, date, status }) {
  const visible = useSelector((state) => state.app.client.formToggle);
  const dispatch = useDispatch();

  /***_______  DELETE Handlers   ________**/
  const deleteHandler = () => {
    if (!visible) {
      dispatch(deleteAction(_id));
    } else {
      toast.error("Close The form!");
    }
  };

  /***_______  OnClick Func   ________**/

  const onToggleFun = () => {
    dispatch(toggleChangeAction(_id));
    if (visible) {
      dispatch(updateWithAction(_id));
    }
  };
  return (
    <>
      <tr className="bg-gray-50 text-center">
        <td className="px-16 py-2 flex flex-row items-center">
          <Image
            className="w-12 h-12 rounded-full"
            src={avatar || "next.svg"}
            alt="avatar"
            width={50}
            height={50}
          />
          <span className="text-center ml-2 font-semibold">
            {firstname || "Unknown"}
          </span>
        </td>
        <td className="px-16 py-2">
          <span>{email || "Unknown"}</span>
        </td>
        <td className="px-16 py-2">
          <span>{sallery || "Unknown"}</span>
        </td>
        <td className="px-16 py-2">
          <span className="text-xs">{date || "Unknown"}</span>
        </td>
        <td className="px-16 py-2">
          <button className="cursor">
            <span
              className={`${
                status === "Active" ? "bg-green-500" : "bg-red-500"
              } text-white px-5 py-1 rounded-full`}
            >
              {status || "Unknown"}
            </span>
          </button>
        </td>
        <td className="px-16 py-2 flex justify-around gap-5">
          <button className="cursor" onClick={onToggleFun}>
            <BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit>
          </button>
          <button className="cursor">
            <BiTrashAlt
              size={25}
              color={"rgb(244,63,94)"}
              onClick={deleteHandler}
            ></BiTrashAlt>
          </button>
        </td>
      </tr>
    </>
  );
}

export default Table;
