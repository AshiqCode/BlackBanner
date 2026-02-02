import { useState } from "react";
import useFetch from "../../Hooks/usefetch";
import NavBar from "./NavBar";
import OrderDetails from "./OrderDetails";
const ViewOrders = () => {
  const user = localStorage.getItem("user");
  const [productId, setProductId] = useState("");
  const { data } = useFetch("http://localhost:3000/orders");
  const [isPopUp, setIsPopUp] = useState(false);
  const orders = data.filter((item) => item.userId === user);
  // console.log(orders);

  const handleViewDetails = (productId) => {
    // console.log(productId);
    setIsPopUp(true);
    setProductId(productId);
  };
  // console.log(productId);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <NavBar />
      <main className="flex-1  mx-auto w-full px-4 sm:px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">My Orders</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Section: Orders Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow border border-gray-200 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                    # Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700 uppercase">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-100">
                {orders.map((product, index) => (
                  <tr
                    key={product.id}
                    className="group  hover:bg-gradient-to-r hover:from-indigo-50/40 hover:to-transparent transition-all"
                  >
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900">
                          Order #{product.id}
                        </span>
                        <span className="text-xs text-gray-400">
                          Tap to inspect details
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        Pending
                      </span>
                    </td>

                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={
                          () => handleViewDetails(product.products)
                          // console.log(product.id)
                        }
                        className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                       text-indigo-600 bg-indigo-50 hover:bg-indigo-600 hover:text-white
                       transition-all duration-300 overflow-hidden"
                      >
                        <span className="z-10">Details</span>
                        <span className="z-10 transform group-hover:translate-x-1 transition">
                          ➜
                        </span>

                        <span className="absolute inset-0  opacity-0 group-hover:opacity-100 transition" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {isPopUp && (
        <OrderDetails
          productId={productId}
          setIsPopUp={setIsPopUp}
          orders={orders}
        />
      )}
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
