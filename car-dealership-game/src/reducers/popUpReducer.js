import {SHOW_FORM, CLOSE_FORM} from "../actions/types";

const initialState = {
    visiblePopUp: {}
};

export default function(state = initialState, action){
    switch (action.type) {
        case SHOW_FORM:
            return action.payload;
        case CLOSE_FORM:
            return action.payload;
        default:
            return state;
    }
}