import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Detail from "./pages/Detail";
import Products from "./pages/Products";
import Auth from "./pages/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { profile } from "./redux/userSlice";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/Cart";

function App() {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector(state => state.user );


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        dispatch(profile());
    }
}, []);



  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route  element={<ProtectedRoute />} > 
        <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<Detail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;