import api from "./api";

export const getProducts = () => {
    return api.get("/v1/products")
}

export const getProductById = (id) => {
    return api.get(`/v1/products/${id}`)
}

export const deleteProductById = (id) => {
    return api.delete(`/v1/products/${id}`)
}
