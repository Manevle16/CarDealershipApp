import {SHOW_FORM, CLOSE_FORM, CREATE_ACCOUNT, LOGIN} from "../actions/types";

const initialState = {
    visiblePopUp: {}
};

export default function(state = initialState, action){
    switch (action.type) {
        case SHOW_FORM:
            initialState.visiblePopUp = action.payload;
            return action.payload;
        case CLOSE_FORM:
            initialState.visiblePopUp = action.payload;
            return action.payload;
        case LOGIN:
        case CREATE_ACCOUNT:
            return {
                visibility: {
                    popUpHidden: true,
                    loginVisibility: 'none',
                    signUpVisibility: 'none'
                },
                formInput: {
                    username: '',
                    password: ''
                }
            };
        default:
            return state;
    }
}