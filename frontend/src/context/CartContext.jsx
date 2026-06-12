import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "sonner";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const getCartItems = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/v1/cart",
                { withCredentials: true }
            );

            console.log("GET CART:", response.data);
            const items = response.data.items || [];

            setCartItems(items);

            return items;
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    useEffect(() => {
        getCartItems();
    }, []);

    const increaseQty = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item._id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decreaseQty = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item._id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const onAddToCart = async (productId) => {
        try {
            const res = await axios.post(
                `http://localhost:5000/api/v1/cart/${productId}`,
                {},
                { withCredentials: true }
            );

            console.log("Response is:", res);

            // const items = await getCartItems(); // cart refresh
            // console.log("Items are:", items);

            toast.success("Item added to cart successfully");

        } catch (error) {
            console.log(error.response?.data);

        }
    };


    const handleRemove = async (productId) => {


        try {
            await axios.delete(
                `http://localhost:5000/api/v1/cart/${productId}`,
                { withCredentials: true }
            );
            toast.success("Item removed from cart successfully");
            getCartItems();
        } catch (error) {
            console.log(error);
        }
    };

    const total = cartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                increaseQty,
                decreaseQty,
                total,
                getCartItems,
                setCartItems,
                handleRemove,
                onAddToCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};