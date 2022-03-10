import * as types from './actionTypes';

const initialState = {
    allData: [],
    loading: false,
    error: null
}

const covidDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_DETAILS_START:
            return {
                ...state,
                loading: true,
                // allData: action.payload
            }
        case types.GET_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                allData: action.payload
            }
        case types.GET_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export default covidDataReducer;