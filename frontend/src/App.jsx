
// import Register from "./components/Register"
import Register from "./pages/Register"
import Home from "./pages/Home"
// import Login from "./components/Login"
import Login from "./pages/Login"
import { Route, Routes } from "react-router-dom"
import ProductDetails from "./pages/ProductDetails"
import MainLayout from "./layouts/MainLayout"
import Cart from "./pages/Cart"
import NotFound from "./pages/NotFound"
import ProfileCard from "./components/profile/ProfileCard"
import About from "./pages/About"
import Contact from "./pages/Contact"

function App() {

  return (
    <div>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/profile/:id" element={<ProfileCard />} />
        </Routes>
      </MainLayout>
    </div>
  )
}

export default App
