import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/usefetch";
import Loading from "../DashBoard/Loading";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);

  const param = useParams().user;
  const { data, setData, Ispending } = useFetch(
    `http://localhost:3000/users/${param}`
  );
  const cart = data.cart;

  useEffect(() => {
    if (cart) {
      cart.map((product) => {
        fetch(`http://localhost:3000/products/${product.id}`)
          .then((res) => res.json())
          .then((json) => {
            setCartProducts((prev) => [...prev, json]);
          });
      });
    }
  }, [cart]);
  console.log(cartProducts);

  const increaseQuantityHandle = () => {};
  const removeItem = (productId) => {
    const newCart = cartProducts.filter((item) => item.id !== productId);
    // console.log(cartProducts, newCart);
    setCartProducts(newCart);

    const oldData = data;
    const newCartIDS = oldData.cart.filter((item) => item.id !== productId);
    console.log(data, newCartIDS);

    oldData.cart = newCartIDS;
    // console.log(data);
    setData(oldData);
    fetch(`http://localhost:3000/users/${param}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  };

  // useEffect(() => {}, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* Navbar */}
      <NavBar />
      {/* Main Content */}
      {Ispending && <Loading />}
      {!Ispending && (
        <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
          <h2 className="text-2xl font-bold mb-6">Your Shopping Cart</h2>

          {cartProducts.map((product, index) => {
            return (
              <div
                key={index}
                className="flex mt-6 flex-col sm:flex-row gap-4 bg-white rounded-xl shadow border border-gray-200 p-4 hover:shadow-lg transition"
              >
                {/* Product Image */}
                <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.Name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col gap-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.Name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Category:{" "}
                    <span className="font-medium">{product.Category}</span>
                  </p>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.Description}
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition">
                        −
                      </button>
                      <span className="text-sm font-medium"></span>
                      <button
                        onClick={increaseQuantityHandle}
                        className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition"
                      >
                        +
                      </button>
                      <button
                        onClick={() => {
                          removeItem(product.id);
                        }}
                        className="ml-2 text-sm text-red-500 hover:text-red-600 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </main>
      )}

      {/* Footer */}
      <footer className="mt-auto pb-6 text-center text-xs text-gray-600  bg-gray-50">
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

export default Cart;
