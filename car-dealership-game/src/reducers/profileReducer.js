import {CREATE_ACCOUNT, LOGIN, ADD_MONEY} from "../actions/types";

const initialState = {
    profile: {},
    panelInfo: {
        display: 'none'
    }
};

export default function(state = initialState, action){
    switch (action.type) {
        case ADD_MONEY:
        case LOGIN:
        case CREATE_ACCOUNT:
            return action.payload;
        default:
            return state;
    }
}