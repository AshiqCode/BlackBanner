import { useEffect, useState } from "react";
import useFetch from "../../Hooks/usefetch";
import { toast } from "react-toastify";

const DeletePopUp = ({
  setIsDeletePopUp,
  userId,
  data,
  usersData,
  setUsersData,
}) => {
  //   const [usersData, setUsersData] = useState([]);

  //   useEffect(() => {
  //     const users = data.filter((user) => user.type !== "admin");
  //     setUsersData(users);
  //   }, [data]);

  const deletehandle = () => {
    // console.log(userId);
    fetch(`http://localhost:3000/users/${userId}`, {
      method: "DELETE",
    });
    setUsersData(
      usersData.filter((e) => {
        return e.id !== userId;
      })
    );
    setIsDeletePopUp(false);
    toast.success("User Deleted successfully");
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        {/* Content */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-800">Delete Item?</h2>
          <p className="mt-2 text-sm text-gray-600">
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => setIsDeletePopUp(false)}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={deletehandle}
              className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePopUp;
