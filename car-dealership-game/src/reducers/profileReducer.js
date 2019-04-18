import {CREATE_ACCOUNT, LOGIN, ADD_MONEY, SUBTRACT_MONEY} from "../actions/types";

const initialState = {
    info: {
        username: '',
        bankAccount: 0,
        carsSold: 0,
        S3_Url: ''
    },
    panelInfo: {
        display: 'none'
    }
};

export default function(state = initialState, action){
    switch (action.type) {
        case SUBTRACT_MONEY: {
            let balance = state.info.bankAccount - action.payload;
            return {
                ...state,
                info: {
                    username: state.info.username,
                    bankAccount: balance,
                    carsSold: state.info.carsSold,
                    S3_Url: state.info.S3_Url
                }
            };
        }
        case ADD_MONEY: {
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
        }
        case LOGIN:
            return {
                info: {
                    username: action.payload.username,
                    bankAccount: action.payload.bankAccount,
                    carsSold: action.payload.carsSold,
                    S3_Url: action.payload.S3_Url
                },
                panelInfo: {
                    display: 'block'
                }
            };
        case CREATE_ACCOUNT:
            return action.payload;
        default:
            return state;
    }
}