import {INIT_MARKET, BUY_CAR, LOGIN, DISABLE_MARKET_REFRESH, SELECT_MARKET_CAR} from "../actions/types";


const initialState = {
    marketCars: [],
    visibility: 'hidden',
    refreshDisabled: false,
    value: 'refresh',
    selectedIndex: -1
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SELECT_MARKET_CAR:
            return {
                ...state,
                selectedIndex: action.payload
            };
        case DISABLE_MARKET_REFRESH:
            return {
                ...state,
                refreshDisabled: action.payload.refreshDisabled,
                value: action.payload.value
            };
        case LOGIN:
            return {
                ...state,
                visibility: 'visible'
            };
        case BUY_CAR:
            return {
                ...state,
                selectedIndex: -1,
                marketCars: action.payload
            };
        case INIT_MARKET:
            return {
                ...state,
                selectedIndex: -1,
                marketCars: action.payload.marketCars
            };
        default:
            return state;
    }
}