import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import AddProduct from "./screens/AddProduct";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import UsersScreen from "./screens/UsersScreen";
import LoginScreen from "./screens/LoginScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRouter comp={<HomeScreen />} />} />
        <Route
          path="/products"
          element={<PrivateRouter comp={<ProductScreen />} />}
        />
        <Route
          path="/product/add"
          element={<PrivateRouter comp={<AddProduct />} />}
        />
        <Route
          path="/product/:id/edit"
          element={<PrivateRouter comp={<ProductEditScreen />} />}
        />
        <Route
          path="/orders"
          element={<PrivateRouter comp={<OrderScreen />} />}
        />
        <Route
          path="/order/:id/detail"
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
  );
}

export default App;
