import {INIT_CUSTOMER} from "../actions/types";

const initialState = {
    customerList: [],
    visibility: 'hidden'
};

export default function(state = initialState, action){
    switch (action.type) {
        case INIT_CUSTOMER:
            return action.payload;
        default:
            return state;
    }
}