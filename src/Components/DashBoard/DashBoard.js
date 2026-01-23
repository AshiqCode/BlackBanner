import OverView from "./OverView";
import AddProduct from "./AddProduct";
import UsersOverView from "./UsersOverView";
import { useState } from "react";
import Products from "./Products";
import ViewOrders from "./ViewOrders";
import { useNavigate } from "react-router-dom";
import Admins from "./Admins";
const Dashboard = () => {
  const [overView, setOverView] = useState(true);
  const [addProduct, setAddProduct] = useState(false);
  const [usersOverView, setUsersOverView] = useState(false);
  const [product, setProduct] = useState(false);
  const [viewOrders, setViewOrders] = useState(false);
  const [admins, setAdmins] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-white border-b border-gray-200">
        {/* Logo */}
        <h1 className="text-3xl font-bold tracking-tight select-none text-gray-900">
          Black<span className="text-yellow-500">Banner</span>
        </h1>

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("type");
            navigate("/");
          }}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 hover:shadow-md hover:text-yellow-500 transition-all duration-200"
        >
          Log Out
        </button>
      </header>

      {/* Main Content with Sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="select-none w-64 bg-gray-100 border-r border-gray-300 p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
          <ul className="flex flex-col gap-2 text-gray-700">
            <li
              onClick={() => {
                setAddProduct(false);
                setOverView(true);
                setUsersOverView(false);
                setViewOrders(false);
                setProduct(false);
                setAdmins(false);
              }}
              className="px-3 py-2 rounded hover:bg-yellow-400 hover:text-black cursor-pointer transition-colors"
            >
              Overview
            </li>

            <li
              onClick={() => {
                setAddProduct(true);
                setOverView(false);
                setUsersOverView(false);
                setProduct(false);
                setViewOrders(false);
                setAdmins(false);
              }}
              className="px-3 py-2 rounded hover:bg-yellow-400 hover:text-black cursor-pointer transition-colors"
            >
              Add Product
            </li>
            <li
              onClick={() => {
                setAddProduct(false);
                setOverView(false);
                setUsersOverView(false);
                setViewOrders(false);
                setProduct(false);
                setAdmins(true);
              }}
              className="px-3 py-2 rounded hover:bg-yellow-400 hover:text-black cursor-pointer transition-colors"
            >
              Admins
            </li>
            <li
              onClick={() => {
                setAddProduct(false);
                setOverView(false);
                setUsersOverView(true);
                setViewOrders(false);
                setProduct(false);
                setAdmins(false);
              }}
              className="px-3 py-2 rounded hover:bg-yellow-400 hover:text-black cursor-pointer transition-colors"
            >
              Users
            </li>
            <li
              onClick={() => {
                setAddProduct(false);
                setOverView(false);
                setViewOrders(false);
                setUsersOverView(false);
                setProduct(true);
                setAdmins(false);
              }}
              className="px-3 py-2 rounded hover:bg-yellow-400 hover:text-black cursor-pointer transition-colors"
            >
              Products
            </li>

            <li
              onClick={() => {
                setAddProduct(false);
                setOverView(false);
                setViewOrders(true);
                setUsersOverView(false);
                setProduct(false);
                setAdmins(false);
              }}
              className="px-3 py-2 rounded hover:bg-yellow-400 hover:text-black cursor-pointer transition-colors"
            >
              View Orders
            </li>
          </ul>
        </aside>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          {overView && <OverView />}
          {addProduct && <AddProduct />}
          {usersOverView && <UsersOverView />}
          {product && <Products />}
          {viewOrders && <ViewOrders />}
          {admins && <Admins />}
        </main>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-600 p-4 border-t border-gray-300">
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

export default Dashboard;
