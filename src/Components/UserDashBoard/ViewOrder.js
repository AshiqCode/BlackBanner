import useFetch from "../../Hooks/usefetch";
import NavBar from "./NavBar";
const ViewOrders = () => {
  const { data } = useFetch("http://localhost:3000/orders");
  console.log(data);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* Navbar */}
      <NavBar />

      {/* Main Content */}
      <main className="flex-1  mx-auto w-full px-4 sm:px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">My Orders</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Section: Orders Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow border border-gray-200 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Order #
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Order Row */}
                <tr className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    #12345
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Product Name
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    2
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    $50
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </td>
                </tr>

                {/* Another Order Row */}
                <tr className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    #12346
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Another Product
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    1
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    $75
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto pb-6 text-center text-xs text-gray-600 bg-gray-50">
        <div className="flex justify-center gap-4 mb-2">
          <span className="text-blue-700 hover:underline cursor-pointer">
            Conditions of Use
          </span>
          <span className="text-blue-700 hover:underline cursor-pointer">
            Privacy Notice
          </span>
          <span className="text-blue-700 hover:underline cursor-pointer">
            Help
          </span>
        </div>
        <p>© {new Date().getFullYear()} BlackBanner</p>
      </footer>
    </div>
  );
};

export default ViewOrders;
