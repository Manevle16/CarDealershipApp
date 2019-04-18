import {
    DISABLE_CUSTOMER_REFRESH,
    INIT_CUSTOMER,
    SELECT_CUSTOMER,
    SET_HAGGLE_FORM,
    SELECT_CAR,
    SHOW_FORM, CLOSE_FORM, SALE_SUCCEEDED,
    LOGIN, UPDATE_CHANCE
} from "../actions/types";

const initialState = {
    customerList: [],
    visibility: 'hidden',
    selectedIndex: -1,
    value: 'refresh',
    refreshDisabled: false,
    hagglePrice: '',
    haggleVisibility: 'none',
    chance: ''
};

export default function(state = initialState, action){
    switch (action.type) {
        case UPDATE_CHANCE:
            return {
                ...state,
                chance: action.payload
            };
        case LOGIN:
            return {
                ...state,
                visibility: 'visible'
            };
        case SALE_SUCCEEDED:
            return {
                ...state,
                customerList: action.payload,
                haggleVisibility: "none",
                hagglePrice: ''
            };
        case SET_HAGGLE_FORM:
            return {
                ...state,
                hagglePrice: action.payload.hagglePrice,
                haggleVisibility: action.payload.haggleVisibility
            };
        case DISABLE_CUSTOMER_REFRESH:
            return {
                ...state,
                value: action.payload.value,
                refreshDisabled: action.payload.refreshDisabled,
                hagglePrice: action.payload.hagglePrice
            };
        case INIT_CUSTOMER:
            return {
                ...state,
                customerList: action.payload.customerList
            };
        case SELECT_CUSTOMER:
            return {
                ...state,
                selectedIndex: action.payload.selectedIndex,
                haggleVisibility: "none",
                hagglePrice: ''
            };
        case SHOW_FORM:
        case CLOSE_FORM:
        case SELECT_CAR:
            return {
                ...state,
                haggleVisibility: "none",
                hagglePrice: '',
                chance: ''
            };
        default:
            return state;
    }
}