import { useEffect, useState } from "react";
import useFetch from "../../Hooks/usefetch";
import Loading from "./Loading";

const UsersOverView = () => {
  const { data, Ispending } = useFetch("http://localhost:3000/users");
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const users = data.filter((user) => user.type !== "admin");
    setUsersData(users);
  }, [data]);

  const deletehandle = (userId) => {
    console.log(userId);
    fetch(`http://localhost:3000/users/${userId}`, {
      method: "DELETE",
    });
    setUsersData(
      usersData.filter((e) => {
        return e.id !== userId;
      })
    );
  };

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {usersData.map((user) => (
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

                  <button
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold
                 text-white bg-red-600 rounded-lg shadow hover:bg-red-700 hover:shadow-md
                 focus:outline-none focus:ring-2 focus:ring-red-400 active:scale-95
                 transition-all duration-200 w-2/6"
                    onClick={() => {
                      deletehandle(user.id);
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
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default UsersOverView;
