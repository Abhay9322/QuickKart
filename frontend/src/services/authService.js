import api from "./api";

export const getProfile = (id) => {
    return api.get(`/v1/users/profile/${id}`);
};


export const registerUser = (data) => {
    return api.post("/v1/auth/register", data)
}

export const loginUser = (data) => {
    return api.post("/v1/auth/login", data)
}