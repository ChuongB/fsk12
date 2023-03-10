import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PrimarySearchAppBar from "./components/AppBar";
import ProductPage from "./pages/ProductPage";
import "./index.css";
import CartPage from "./pages/CartPage";
function App() {
  return (
    <BrowserRouter>
      <PrimarySearchAppBar />
      <Routes>
        <Route path="/products" element={<ProductPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
