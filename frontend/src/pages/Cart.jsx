import React, { useEffect, useState } from "react";
// import CartItem from "./CartItem";
import CartItem from "../components/cart/CartItem";
import "./cart.css";
import {
    getCart,
    updateCart,
    deleteCartItem
} from "../services/cartService";

const Cart = () => {

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch cart
    useEffect(() => {
        const fetchCart = async () => {
            try {
                setLoading(true);
                const res = await getCart();
                setCartItems(res.data.data.items); // 👈 important
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    // Increase qty
    const increaseQty = async (id, quantity) => {
        const newQty = quantity + 1;

        await updateCart(id, { quantity: newQty });

        setCartItems(prev =>
            prev.map(item =>
                item._id === id ? { ...item, quantity: newQty } : item
            )
        );
    };

    // Decrease qty
    const decreaseQty = async (id, quantity) => {
        if (quantity === 1) return;

        const newQty = quantity - 1;

        await updateCart(id, { quantity: newQty });

        setCartItems(prev =>
            prev.map(item =>
                item._id === id ? { ...item, quantity: newQty } : item
            )
        );
    };

    // Remove item
    const removeItem = async (id) => {
        await deleteCartItem(id);

        setCartItems(prev =>
            prev.filter(item => item._id !== id)
        );
    };

    const total = cartItems.reduce(
        (acc, item) =>
            acc + item.product?.price * item.quantity,
        0
    );

    if (loading) return <p>Loading cart...</p>;

    return (
        <div className="cart-container">

            <h2>🛒 Your Cart</h2>

            <div className="cart-layout">

                {/* LEFT */}
                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        cartItems.map(item => (
                            <CartItem
                                key={item._id}
                                item={item}
                                onIncrease={increaseQty}
                                onDecrease={decreaseQty}
                                onRemove={removeItem}
                            />
                        ))
                    )}
                </div>

                {/* RIGHT */}
                <div className="cart-summary">

                    <h3>Order Summary</h3>

                    <div className="summary-row">
                        <span>Total Items</span>
                        <span>{cartItems.length}</span>
                    </div>

                    <div className="summary-row">
                        <span>Total Price</span>
                        <span>₹ {total}</span>
                    </div>

                    <button className="checkout-btn">
                        Proceed to Checkout
                    </button>

                </div>

            </div>
        </div>
    );
};

export default Cart;