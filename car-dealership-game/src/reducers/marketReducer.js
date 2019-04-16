import {INIT_MARKET, BUY_CAR, LOGIN} from "../actions/types";


const initialState = {
    marketCars: [],
    selectedIndex: -1
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                marketCars: state.marketCars,
                selectedIndex: state.selectedIndex,
                visibility: 'visible',
                refreshDisabled: false,
                value: "refresh"
            };
        case BUY_CAR:
            return  action.payload;
        case INIT_MARKET:
            return action.payload;
        default:
            return state;
    }
}