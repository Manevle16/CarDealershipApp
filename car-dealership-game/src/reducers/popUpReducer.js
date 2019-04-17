import {SHOW_FORM, CLOSE_FORM, CREATE_ACCOUNT, LOGIN} from "../actions/types";

const initialState = {
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

export default function(state = initialState, action){
    switch (action.type) {
        case SHOW_FORM:
        case CLOSE_FORM:
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