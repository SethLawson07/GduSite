import { post } from "./api"

export const register = async (customer) => await post("auth/register",customer)

export const login = async (customer) => await post("auth/login",customer)


