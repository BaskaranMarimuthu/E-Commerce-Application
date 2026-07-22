import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Register from "./User/Register";
import Product from "./Pages/productDetails";
import ProductsPage from "./Pages/ProductsPage";
import Login from "./User/Login";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./features/user/userSlice";
import Profile from "./User/Profile";
import UpdateProfile from "./User/UpdateProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdatePassword from "./User/UpdatePassword";
import Cart from "./Cart/Cart";
const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser());
    }
  }, [dispatch, isAuthenticated]);
  // console.log(isAuthenticated, user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Products/:id" element={<Product />} />
        <Route path="/Products" element={<ProductsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path="/profile/update"
          element={<ProtectedRoute element={<UpdateProfile />} />}
        />
        <Route
          path="/password/update"
          element={<ProtectedRoute element={<UpdatePassword />} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
