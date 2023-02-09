import { FcCheckmark } from "react-icons/fc";
const Success = ({ message }) => {
  return (
    <>
      <div className="success container mx-auto text-3xl">
        <div className="flex justify-center mx-auto  border border-yellow-200 bg-yello-200 w-3/4 text-gray-900 ">
          {message}{" "}
          <span className="pl-4">
            <FcCheckmark />
          </span>
        </div>
      </div>
    </>
  );
};

export default Success;
