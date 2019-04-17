import {CREATE_ACCOUNT, LOGIN, ADD_MONEY} from "../actions/types";

const initialState = {
    info: {
        username: '',
        bankAccount: 0,
        carsSold: 0,
        S3_Url: ''
    },
    panelInfo: {
        display: 'block'
    }
};

export default function(state = initialState, action){
    switch (action.type) {
        case ADD_MONEY:
            let balance = state.info.bankAccount + action.payload;
            let carsSold = state.info.carsSold + 1;
            return {
                ...state,
                info: {
                    username: state.info.username,
                    bankAccount: balance,
                    carsSold,
                    S3_Url: state.info.S3_Url
                }
            };
        case LOGIN:
        case CREATE_ACCOUNT:
            return action.payload;
        default:
            return state;
    }
}