import { HYDRATE } from "next-redux-wrapper";

import { addTripToUserHistory } from "../../api/firebase.api";
import { addTripToHistory } from "../user/user.actions";
import { travelActionTypes } from "./travel.types";

const INITIAL_STATE = {
  details: {
    seat: "Not selected",
  },
};

const travelReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        details: action.payload.travel.details,
      };
    case travelActionTypes.REGISTER_TRAVEL:
      const details = {
        ...state.details,
        ...action.payload.data,
      };
      addTripToUserHistory(action.payload.uid, details);
      return {
        ...state,
        details,
      };
    case travelActionTypes.REGISTER_SEAT:
      return {
        ...state,
        details: {
          ...state.details,
          seat: action.payload,
        },
      };
    default:
      return state;
  }
};

export default travelReducer;
