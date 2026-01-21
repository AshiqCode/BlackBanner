import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../Hooks/usefetch";
import Loading from "../DashBoard/Loading";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const param = useParams().id;
  const user = localStorage.getItem("user");
  const { data, Ispending } = useFetch(
    `http://localhost:3000/products/${param}`
  );

  const navigate = useNavigate();
  const AddToCartHandle = () => {
    if (user) {
      fetch(`http://localhost:3000/users/${user}`)
        .then((response) => response.json())
        .then((user) => {
          var mergedObj;
          if (user.cart) {
            const item = user.cart.find((cart) => param === cart.id);
            if (item) {
              mergedObj = {
                ...user,
                cart: user.cart.map((cart) =>
                  cart.id === param
                    ? { ...cart, Quantity: cart.Quantity + 1 }
                    : cart
                ),
              };
            } else {
              mergedObj = {
                ...user,
                cart: [...user.cart, { id: param, Quantity: 1 }],
              };
            }
          } else {
            mergedObj = {
              ...user,
              cart: [{ id: param, Quantity: 1 }],
            };
          }

          fetch(`http://localhost:3000/users/${user.id}`, {
            method: "PUT",
            body: JSON.stringify(mergedObj),
          });
        });
      toast.success("Product Added successfully");
    } else {
      toast.warning("Your cart awaits, just log in!");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      {Ispending && (
        <div className="flex justify-center my-10">
          <Loading />
        </div>
      )}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-300">
        {/* Logo */}
        <h1 className="text-3xl font-semibold tracking-tight select-none">
          Black<span className="text-yellow-500"> Banner</span>
        </h1>

        {/* Nav Links */}
        <nav className="flex gap-4 text-sm font-medium">
          <Link
            to="/"
            className="text-gray-900 hover:text-yellow-500 transition-colors"
          >
            Home
          </Link>

          <Link
            to={user ? `/Profile/${user}` : "/Login"}
            className="text-gray-900 hover:text-yellow-500 transition-colors"
          >
            {user ? "Profile" : "Login"}
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex justify-center items-start capitalize  px-4 bg-gray-50">
        {!Ispending && (
          <div className="max-w-5xl mt-12 w-full bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Image */}
            <div className="w-full h-96 relative rounded-xl overflow-hidden shadow-md">
              <img
                src={data.image}
                alt={data.Name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-4">
              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-semibold  text-gray-900">
                {data.Name}
              </h1>

              {/* Category */}
              <span className="inline-block w-fit text-xs font-medium bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                {data.Category}
              </span>

              {/* Price */}
              <p className="text-2xl font-bold text-gray-900">${data.price}</p>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {data.Description}
              </p>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={AddToCartHandle}
                  className="flex-1 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-medium rounded-lg transition"
                >
                  Add to Cart
                </button>
              </div>

              {/* Extra Info */}
              <div className="mt-6 text-sm text-gray-500 border-t pt-4">
                ✔ Secure payment
                <br />
                ✔ Fast delivery
                <br />✔ Easy returns
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-1/2 transform -translate-x-1/2 pb-6 text-center text-xs text-gray-600 w-full">
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

export default ProductDetails;
