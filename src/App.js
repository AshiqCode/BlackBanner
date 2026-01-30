import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import DashBoard from "./Components/DashBoard/DashBoard";
import Products from "./Components/UserDashBoard/Products";
import ProductDetails from "./Components/UserDashBoard/ProductDetails";
import Profile from "./Components/UserDashBoard/Profile";
import Cart from "./Components/UserDashBoard/Cart";
import Checkout from "./Components/UserDashBoard/CheckOut";
import ViewOrders from "./Components/UserDashBoard/ViewOrder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<Signup />} />
        <Route path="/DashBoard" element={<DashBoard />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/ProductDetails/:id" element={<ProductDetails />} />
        <Route path="/Profile/:user" element={<Profile />} />
        <Route path="/Cart/:user" element={<Cart />} />
        <Route path="/CheckOut" element={<Checkout />} />
        <Route path="/ViewOrder" element={<ViewOrders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
