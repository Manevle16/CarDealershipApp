import {LOGIN} from "../actions/types";

const initialState = {
    buttonVisibility: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return{
                buttonVisibility: 'visible'
            };
        default:
            return state;
    }
}