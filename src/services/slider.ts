import { get } from "./api";

export const slider = async (position) => await get("slider/position/"+position)
