import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./rootReducer";

const middleware = [thunk];

// if (process.env.NODE_ENV === 'development') {
//     middleware.push(logger);
// }

const Store = createStore(rootReducer, applyMiddleware(...middleware));

export default Store;