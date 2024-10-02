import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import AddProduct from "./screens/AddProduct";
import ProductEditScreen from "./screens/ProductEditScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import UsersScreen from "./screens/UsersScreen";
import LoginScreen from "./screens/LoginScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRouter comp={<HomeScreen />} />} />
          <Route
            path="/products"
            element={<PrivateRouter comp={<ProductScreen />} />}
          />
          <Route
            path="/addproduct"
            element={<PrivateRouter comp={<AddProduct />} />}
          />
          <Route
            path="/product/:id/edit"
            element={<PrivateRouter comp={<ProductEditScreen />} />}
          />
          <Route
            path="/category"
            element={<PrivateRouter comp={<CategoriesScreen />} />}
          />
          <Route
            path="/orders"
            element={<PrivateRouter comp={<OrderScreen />} />}
          />
          <Route
            path="/order/:id"
            element={<PrivateRouter comp={<OrderDetailScreen />} />}
          />
          <Route
            path="/users"
            element={<PrivateRouter comp={<UsersScreen />} />}
          />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="*" element={<PrivateRouter comp={<NotFound />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
