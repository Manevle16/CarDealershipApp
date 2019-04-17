import {ADD_CAR, LOGIN, SELECT_CAR} from "../actions/types";

const initialState = {
    carInventory: [],
    selectedIndex: -1,
    visibility: 'hidden'
};

export default function(state = initialState, action){
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                visibility: 'visible'
            };
        case SELECT_CAR:
            return {
                ...state,
                selectedIndex: action.payload.selectedIndex
            };
        case ADD_CAR:
            return {
                ...state,
                carInventory: action.payload.carInventory
            };
        default:
            return state
    }
}