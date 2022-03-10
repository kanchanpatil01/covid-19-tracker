import { combineReducers } from "redux";

import covidDataReducer from "./reducer";

const rootReducer = combineReducers({
    allData: covidDataReducer,
})

export default rootReducer;