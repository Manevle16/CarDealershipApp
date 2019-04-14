import {CREATE_ACCOUNT, LOGIN} from "../actions/types";

const initialState = {
    profile: {}
};

export default function(state = initialState, action){
    switch (action.type) {
        default:
            return state;
    }
}