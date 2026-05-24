import api from "./api";


// GET CART
export const getCart = () =>
    api.get("/v1/cart", {
        withCredentials: true
    });


// ADD TO CART
export const addToCart = (productId, data) =>
    api.post(
        `/v1/cart/${productId}`,
        data,
        {
            withCredentials: true
        }
    );


// UPDATE CART
export const updateCart = (id, data) =>
    api.put(
        `/v1/cart/${id}`,
        data,
        {
            withCredentials: true
        }
    );


// DELETE CART ITEM
export const deleteCartItem = (id) =>
    api.delete(
        `/v1/cart/${id}`,
        {
            withCredentials: true
        }
    );