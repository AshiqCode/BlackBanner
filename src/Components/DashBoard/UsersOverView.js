import { useEffect, useState } from "react";
import useFetch from "../../Hooks/usefetch";
import Loading from "./Loading";
import DeletePopUp from "./DeletePopUp";

const UsersOverView = () => {
  const { data, Ispending } = useFetch("http://localhost:3000/users");
  const [usersData, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isDeletePopUp, setIsDeletePopUp] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
  const pageSize = 5;
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const currentUsers = usersData.slice(startIndex, endIndex);

  useEffect(() => {
    const users = data.filter((user) => user.type !== "admin");
    setUsersData(users);
  }, [data]);

  // const deletehandle = (userId) => {
  //   const confirm = window.confirm("delete Product");
  //   if (confirm) {
  //     // console.log(userId);
  //     fetch(`http://localhost:3000/users/${userId}`, {
  //       method: "DELETE",
  //     });
  //     setUsersData(
  //       usersData.filter((e) => {
  //         return e.id !== userId;
  //       })
  //     );
  //   }
  // };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* Page Wrapper */}
      <main className="p-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Users <span className="text-yellow-500">Overview</span>
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage and review all registered users in your system
          </p>
        </div>

        {/* Loading State */}
        {Ispending && (
          <div className="flex justify-center my-10">
            <Loading />
          </div>
        )}

        {/* Users Grid */}
        {!Ispending && (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Password
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.Name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 break-all">
                      {user.Email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 tracking-widest">
                      {user.Password}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="flex items-center gap-2 px-3 py-1 text-white bg-red-600 rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 active:scale-95 transition-all duration-200"
                        // onClick={() => deletehandle(user.id)}
                        onClick={() => {
                          setIsDeletePopUp(true);
                          setCurrentUserId(user.id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {isDeletePopUp && (
              <DeletePopUp
                setIsDeletePopUp={setIsDeletePopUp}
                userId={currentUserId}
                data={data}
                usersData={usersData}
                setUsersData={setUsersData}
              />
            )}

            <div className="flex justify-center items-center gap-2 mt-4">
              {/* Prev button */}
              <button
                className={`px-3 py-1 rounded ${
                  currentPage === 0 ? "bg-gray-300" : "bg-orange-500 text-white"
                }`}
                onClick={() =>
                  currentPage > 0 && setCurrentPage(currentPage - 1)
                }
                disabled={currentPage === 0}
              >
                Prev
              </button>

              {/* Page numbers */}
              {Array.from({
                length: Math.ceil(usersData.length / pageSize),
              }).map((_, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 rounded ${
                    currentPage === index
                      ? "bg-red-500 text-white"
                      : "bg-black text-white"
                  }`}
                  onClick={() => setCurrentPage(index)}
                >
                  {index + 1}
                </button>
              ))}

              {/* Next button */}
              <button
                className={`px-3 py-1 rounded ${
                  currentPage === Math.ceil(usersData.length / pageSize) - 1
                    ? "bg-gray-300"
                    : "bg-orange-500 text-white"
                }`}
                onClick={() =>
                  currentPage < Math.ceil(usersData.length / pageSize) - 1 &&
                  setCurrentPage(currentPage + 1)
                }
                disabled={
                  currentPage === Math.ceil(usersData.length / pageSize) - 1
                }
              >
                Next
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default UsersOverView;
