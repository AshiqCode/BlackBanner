import { useEffect, useState } from "react";
import useFetch from "../../Hooks/usefetch";
import { toast } from "react-toastify";

const ViewOrders = () => {
  // const { data, setData, Ispending } = useFetch("http://localhost:3000/orders");

  const [orderedProducts, setOrderedProducts] = useState([]);
  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);
  // console.log(data);
  useEffect(() => {
    const fetchOrdersWithUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/orders");
        const orders = await res.json();

        const ordersWithUsers = await Promise.all(
          orders.map(async (order) => {
            const userRes = await fetch(
              `http://localhost:3000/users/${order.userId}`
            );
            const user = await userRes.json();

            return {
              ...order,
              user, // attach user data here
            };
          })
        );

        setData(ordersWithUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchOrdersWithUsers();
  }, []);

  useEffect(() => {
    data.map((product) => {
      product.products.map((item) => {
        fetch(`http://localhost:3000/products/${item.id}`)
          .then((res) => res.json())
          .then((json) => {
            setOrderedProducts((prev) => [
              ...prev,
              { ...json, quantity: product.Quantity },
            ]);
          });
      });
    });
  }, [data]);

  const statusHandle = (statusvaluse, orderId) => {
    console.log(statusvaluse, orderId);

    fetch(`http://localhost:3000/orders/${orderId}`, {
      method: "PATCH",
      body: JSON.stringify({ status: statusvaluse }),
    })
      .then((res) => res.json())
      .then((json) => {
        setData((prev) =>
          prev.map((item) =>
            item.id === json.id ? { ...json, user: item.user } : item
          )
        );
      });
  };

  console.log(data);

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      <main className="flex-1 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Orders</h1>

        <div className="space-y-6">
          {data.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2 sm:gap-0">
                <h2 className="text-lg font-semibold text-gray-800">
                  Order #{order.id}
                </h2>
                <div className="flex flex-col sm:flex-row sm:space-x-4 text-gray-500 text-sm">
                  <span>User: {order.user.Name}</span>
                  <span>Email: {order.user.Email}</span>
                  <span>Number: {order.user.Number}</span>
                </div>
              </div>

              {/* Order Info */}
              <div className="flex flex-col sm:flex-row sm:justify-between mb-5 text-gray-600 text-sm">
                <p>
                  <span className="font-semibold">Total:</span> ${order.total}
                </p>
                <p className="mt-1 sm:mt-0">
                  <span className="font-semibold">Delivery:</span>{" "}
                  {order.deliveryAddress}
                </p>
              </div>

              {/* Status Dropdown */}
              <div className="flex items-center gap-3 mb-5 flex-wrap">
                <label className="text-gray-700 font-medium">
                  Change Status:
                </label>
                <select
                  value={order.status}
                  onClick={() => {
                    if (order.status === "You canceled order") {
                      toast.warning(
                        "User canceled order. Status cannot be changed!"
                      );
                    }
                  }}
                  onChange={(e) => {
                    if (order.status === "You canceled order") return; // prevent changing
                    statusHandle(e.target.value, order.id);
                  }}
                  className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="Admin canceled order">Canceled</option>
                </select>
              </div>

              {/* Products Grid */}
              <h3 className="text-md font-semibold mb-3 text-gray-800">
                Products:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {order.products.map((item) => {
                  const productDetails = orderedProducts.find(
                    (p) => p.id === item.id
                  );
                  return productDetails ? (
                    <div
                      key={item.id}
                      className="flex items-center bg-gray-50 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <img
                        src={productDetails.image}
                        alt={productDetails.name}
                        className="w-16 h-16 object-cover rounded-md mr-3"
                      />
                      <div className="text-sm">
                        <p className="font-medium text-gray-800">
                          {productDetails.name}
                        </p>
                        <p className="text-gray-500">
                          Category: {productDetails.category}
                        </p>
                        <p className="text-gray-500">
                          Price: ${productDetails.price}
                        </p>
                        <p className="text-gray-500">
                          Quantity:{" "}
                          {item.quantity || productDetails.quantity || 1}
                        </p>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ViewOrders;
