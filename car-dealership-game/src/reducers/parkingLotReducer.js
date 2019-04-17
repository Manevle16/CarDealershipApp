import {INIT_PARKING_LOT, PARK_CAR, UNPARK_CAR} from "../actions/types";


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
        case UNPARK_CAR:
            let parkingLot = JSON.parse(JSON.stringify(state.parkingLot));

            for(let i = 0; i < state.parkingLot.length; i++){
                for(let j = 0; j < state.parkingLot.length; j++){
                    if(parkingLot[i][j] != null && action.payload === parkingLot[i][j].key){
                        parkingLot[i][j] = null;
                    }
                }
            }

            return {
                ...state,
                parkingLot
            };
        default:
            return state;
    }
}

