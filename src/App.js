import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import PrimarySearchAppBar from "./components/AppBar";
import "./index.css";
import ProductManagement from "./pages/admin/ProductManagementPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
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

        <Route
          path="/admin/products"
          element={
            isLoggedIn ? <ProductManagement /> : <Navigate to="/login" />
          }
        ></Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
