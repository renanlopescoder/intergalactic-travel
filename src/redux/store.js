import logger from "redux-logger";
import { createStore, applyMiddleware } from "redux";

import { createWrapper } from "next-redux-wrapper";

import rootReducer from "./root-reducer";

const middlewares = [];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

// create a makeStore function
const makeStore = (context) =>
  createStore(rootReducer, applyMiddleware(...middlewares));

export const wrapper = createWrapper(makeStore, { debug: true });
