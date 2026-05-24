import React from "react";
import "./cartItem.css";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
    return (
        <div className="cart-item-card">

            <img
                src={item.product?.image || "https://via.placeholder.com/100"}
                alt={item.product?.name}
                className="cart-item-img"
            />

            <div className="cart-item-details">
                <h4>{item.product?.name}</h4>
                <p className="cart-item-price">₹ {item.product?.price}</p>
            </div>

            <div className="cart-item-qty">
                <button onClick={() => onDecrease(item._id, item.quantity)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onIncrease(item._id, item.quantity)}>+</button>
            </div>

            <div className="cart-item-total">
                ₹ {item.product?.price * item.quantity}
            </div>

            <button
                className="cart-item-remove"
                onClick={() => onRemove(item._id)}
            >
                ✕
            </button>

        </div>
    );
};

export default CartItem;