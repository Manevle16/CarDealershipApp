import {INIT_MARKET, BUY_CAR} from "../actions/types";


const initialState = {
    marketCars: [],
    selectedIndex: -1
};

export default function (state = initialState, action) {
    switch (action.type) {
        case BUY_CAR:
            console.log(state);
            return  action.payload;
        case INIT_MARKET:
            return action.payload;
        default:
            return state;
    }
}