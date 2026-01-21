import useFetch from "../../Hooks/usefetch";

const Overview = () => {
  const { data } = useFetch("http://localhost:3000/users");

  return (
    <div className="flex-1 p-6">
      {/* Dashboard Content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-100  p-6 rounded shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Total Users</h3>
            <p className="text-gray-700 text-2xl">{data.length}</p>
          </div>
          <div className="bg-gray-100  p-6 rounded shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Active Sessions</h3>
            <p className="text-gray-700 text-2xl">567</p>
          </div>
          <div className="bg-gray-100  p-6 rounded shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Revenue</h3>
            <p className="text-gray-700 text-2xl">$12,345</p>
          </div>
        </div>

        {/* More Dashboard Content */}
      </main>
    </div>
  );
};

export default Overview;
