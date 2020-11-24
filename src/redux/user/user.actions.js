import { userActionTypes } from "./user.types";

export const setCurrentUserAction = (user = null) => ({
  type: userActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const addTripToHistory = (trip) => ({
  type: userActionTypes.ADD_TRIP_HISTORY,
  payload: trip,
});
