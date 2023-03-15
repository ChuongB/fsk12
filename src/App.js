import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PrimarySearchAppBar from "./components/AppBar";
import ProductPage from "./pages/ProductPage";
import "./index.css";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from "./pages/ProfilePage";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function App() {
  const { isLoggedIn } = useSelector((state) => state.product);
  return (
    <BrowserRouter>
      <PrimarySearchAppBar />
      <Routes>
        <Route path="/" element={<Navigate to="/products" />}></Route>
        <Route path="/products" element={<ProductPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route
          path="/profile"
          element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />}
        ></Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
