import { travelActionTypes } from "./travel.types";

export const registerTravel = (data) => ({
  type: travelActionTypes.REGISTER_TRAVEL,
  payload: data,
});

export const registerSeat = (data) => ({
  type: travelActionTypes.REGISTER_SEAT,
  payload: data,
});
