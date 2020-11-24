import { HYDRATE } from "next-redux-wrapper";

import { userActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userActionTypes.ADD_TRIP_HISTORY:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          history: [...state.currentUser.history, action.payload],
        },
      };
    default:
      return state;
  }
};

export default userReducer;
