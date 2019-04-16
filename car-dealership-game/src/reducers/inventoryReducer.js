import {ADD_CAR, LOGIN} from "../actions/types";

const initialState = {
    carInventory: [],
    selected: -1,
    visibility: 'hidden'
};

export default function(state = initialState, action){
    switch (action.type) {
        case LOGIN:
            return {
                carInventory: state.carInventory,
                visibility: 'visible'
            };
        case ADD_CAR:
            return action.payload;
        default:
            return state
    }
}