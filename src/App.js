import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PrimarySearchAppBar from "./components/AppBar";
import ProductPage from "./pages/ProductPage";
import "./index.css";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <BrowserRouter>
      <PrimarySearchAppBar />
      <Routes>
        <Route path="/products" element={<ProductPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
