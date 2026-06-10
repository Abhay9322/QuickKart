import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { UserProvider } from './context/UserContex.jsx'

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </UserProvider>


)
