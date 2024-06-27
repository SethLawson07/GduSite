import { post } from "./api"

export const applyPromoCode = async (data) => await post("promocode/apply",data)