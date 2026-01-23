import { useEffect, useState } from "react";
import useFetch from "../../Hooks/usefetch";
import Loading from "./Loading";

const Admins = () => {
  const { data, Ispending } = useFetch("http://localhost:3000/users");
  const [adminData, setAdminData] = useState([]);

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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {adminData.map((user) => (
              <div
                key={user.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 flex flex-col gap-4"
              >
                {/* User Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {user.Name}
                  </h3>
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                    ID: {user.id}
                  </span>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-200" />

                {/* User Details */}
                <div className="flex flex-col gap-2 text-sm">
                  <p className="text-gray-700">
                    <span className="font-medium text-gray-900">Email:</span>{" "}
                    {user.Email}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium text-gray-900">Password:</span>{" "}
                    {user.Password}
                  </p>
                  <button>Delete User</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admins;
