import { useEffect, useState } from "react";
import useFetch from "../../Hooks/usefetch";
import Loading from "./Loading";

import { toast } from "react-toastify";

const Admins = () => {
  const { data, setData, Ispending } = useFetch("http://localhost:3000/users");
  const [adminData, setAdminData] = useState([]);
  const [isaddAdmin, setIsaddAdmin] = useState(false);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [currentPage, setCurrentPage] = useState(0); // current page index
  const pageSize = 5; // number of admins per page
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const currentAdmins = adminData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(adminData.length / pageSize);

  const handleAddAdmin = () => {
    const admin = {
      Name: Name,
      Email: Email,
      Password: Password,
      type: "admin",
    };
    fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify(admin),
    })
      .then((res) => res.json())
      .then((json) => {
        setData((prev) => [...prev, json]);
        setIsaddAdmin(false);
        toast.success("New Admin Added");
      });
  };

  useEffect(() => {
    const admin = data.filter((user) => user.type === "admin");
    setAdminData(admin);
  }, [data]);
  //   console.log(usersData);

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* Page Wrapper */}
      <main className="p-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Users <span className="text-yellow-500">Overview</span>
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Manage and review all registered users in your system
            </p>
          </div>

          <button
            className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg
               shadow hover:bg-green-700 hover:shadow-md focus:outline-none focus:ring-2
               focus:ring-green-400 active:scale-95 transition-all duration-200"
            onClick={() => {
              setIsaddAdmin(true);
            }}
          >
            Add Admin
          </button>
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentAdmins.map((user) => (
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
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center items-center gap-2 mt-4">
              {/* Prev button */}
              <button
                className={`px-3 py-1 rounded ${
                  currentPage === 0 ? "bg-gray-300" : "bg-yellow-500 text-white"
                }`}
                onClick={() =>
                  currentPage > 0 && setCurrentPage(currentPage - 1)
                }
                disabled={currentPage === 0}
              >
                Prev
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 rounded ${
                    currentPage === index
                      ? "bg-red-500 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                  onClick={() => setCurrentPage(index)}
                >
                  {index + 1}
                </button>
              ))}

              {/* Next button */}
              <button
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages - 1
                    ? "bg-gray-300"
                    : "bg-yellow-500 text-white"
                }`}
                onClick={() =>
                  currentPage < totalPages - 1 &&
                  setCurrentPage(currentPage + 1)
                }
                disabled={currentPage === totalPages - 1}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {isaddAdmin && (
          // Popup Overlay
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {/* Popup Content */}
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
              {/* Close Button */}
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setIsaddAdmin(false);
                }}
              >
                &times;
              </button>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Add Admin
              </h3>

              {/* Input Fields */}
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <input
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <input
                  type="text"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Submit Button */}
              <button
                className="mt-6 w-full px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow hover:bg-yellow-600 hover:shadow-md transition-all duration-200"
                onClick={handleAddAdmin}
              >
                Add Admin
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admins;
