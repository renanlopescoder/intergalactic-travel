import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import travelReducer from "./travel/travel.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  travel: travelReducer,
});

export default rootReducer;
