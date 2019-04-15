import {ADD_CAR} from "../actions/types";

const initialState = {
    carInventory: [],
    selected: -1
};

export default function(state = initialState, action){
    switch (action.type) {
        case ADD_CAR:
            return action.payload;
        default:
            return state
    }
}