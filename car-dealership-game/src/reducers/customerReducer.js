import {
    DISABLE_CUSTOMER_REFRESH,
    INIT_CUSTOMER,
    SELECT_CUSTOMER,
    SET_HAGGLE_FORM,
    SELECT_CAR,
    SHOW_FORM, CLOSE_FORM, SALE_SUCCEEDED
} from "../actions/types";

const initialState = {
    customerList: [],
    visibility: 'visible',
    selectedIndex: -1,
    value: 'refresh',
    refreshDisabled: false,
    hagglePrice: '',
    haggleVisibility: 'none'
};

export default function(state = initialState, action){
    switch (action.type) {
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
                refreshDisabled: action.payload.refreshDisabled
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
                hagglePrice: ''
            };
        default:
            return state;
    }
}