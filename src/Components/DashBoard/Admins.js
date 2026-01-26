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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {adminData.map((user) => (
              <div
                key={user.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm
                   hover:shadow-md transition-all duration-200"
              >
                <div className="p-6 flex flex-col gap-5">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">
                        {user.Name}
                      </h3>
                    </div>
                  </div>

                  <div className="h-px bg-gray-200" />

                  {/* Details */}
                  <div className="space-y-3 text-sm">
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-wide text-gray-500">
                        Email
                      </span>
                      <span className="text-gray-800 break-all">
                        {user.Email}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-wide text-gray-500">
                        Password
                      </span>
                      <span className="text-gray-800 tracking-widest">
                        {user.Password}
                      </span>
                    </div>
                  </div>

                  {/* Delete Button */}
                </div>
              </div>
            ))}
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
