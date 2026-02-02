import { useEffect, useState } from "react";
import useFetch from "../../Hooks/usefetch";

const ViewOrders = () => {
  const { data, setData, Ispending } = useFetch("http://localhost:3000/orders");
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [status, setStatus] = useState("");

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
  console.log(data);

  const statusHandle = (statusvaluse, orderId) => {
    console.log(statusvaluse, orderId);

    fetch(`http://localhost:3000/orders/${orderId}`, {
      method: "PATCH",
      body: JSON.stringify({ status: statusvaluse }),
    })
      .then((res) => res.json())
      .then((json) => {
        setData((prev) =>
          prev.map((item) => (item.id === json.id ? json : item))
        );
      });
  };

  return (
    <div className="flex-1 p-4 bg-gray-100 min-h-screen">
      <main className="flex-1 max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          Orders
        </h1>

        <div className="space-y-5">
          {data.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow rounded-lg p-5 hover:shadow-lg transition-shadow duration-200"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
                <h2 className="text-lg font-semibold text-gray-700">
                  Order #{order.id}
                </h2>
                <span className="text-sm text-gray-500 mt-1 sm:mt-0">
                  User ID: {order.userId}
                </span>
              </div>

              {/* Order Info */}
              <div className="flex flex-col sm:flex-row sm:justify-between mb-4 text-sm text-gray-600">
                <p>
                  <span className="font-semibold">Total:</span> ${order.total}
                </p>
                <p className="mt-1 sm:mt-0">
                  <span className="font-semibold">Delivery:</span>
                  {order.deliveryAddress}
                </p>
              </div>

              {/* Buttons & Dropdown */}
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex gap-2">
                  <p>Change Order Status</p>
                  <select
                    value={order.status}
                    onChange={(e) => {
                      statusHandle(e.target.value, order.id);
                    }}
                    className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              <h3 className="text-md font-semibold mb-2 text-gray-700">
                Products:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {order.products.map((item) => {
                  const productDetails = orderedProducts.find(
                    (p) => p.id === item.id
                  );
                  return productDetails ? (
                    <div
                      key={item.id}
                      className="flex items-center bg-gray-50 rounded-md p-2 shadow-sm hover:shadow-md transition-shadow duration-150"
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
