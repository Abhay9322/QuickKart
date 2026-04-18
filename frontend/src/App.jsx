
import Register from "./components/Register"
import Home from "./pages/Home"
import Login from "./components/Login"
import { Route, Routes } from "react-router-dom"
import ProductDetails from "./pages/ProductDetails"

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  )
}

export default App
