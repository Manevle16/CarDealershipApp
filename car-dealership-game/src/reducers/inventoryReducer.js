import {ADD_CAR, LOGIN, SELECT_CAR, REMOVE_CAR} from "../actions/types";

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
                carInventory: action.payload.carInventory,
                visibility: 'visible'
            };
        case SELECT_CAR:
            return {
                ...state,
                selectedIndex: action.payload.selectedIndex
            };
        case ADD_CAR: {
            let cars = JSON.parse(JSON.stringify(state.carInventory));
            cars.push(action.payload);
            return {
                ...state,
                carInventory: cars
            };
        }
        case REMOVE_CAR: {
            let cars = JSON.parse(JSON.stringify(state.carInventory));
            cars.splice(action.payload, 1);
            return {
                ...state,
                carInventory: cars
            };
        }
        default:
            return state
    }
}