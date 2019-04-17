import {INIT_PARKING_LOT, PARK_CAR} from "../actions/types";


const initialState = {
    parkingLotCords: [[]],
    parkingLot: [[]]
};

export default function(state = initialState, action){
    switch(action.type) {
        case PARK_CAR:
            return {
                ...state,
                parkingLot: action.payload
            };
        case INIT_PARKING_LOT:
            return action.payload;
        default:
            return state;
    }
}

