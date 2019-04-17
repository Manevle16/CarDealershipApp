import {DISABLE_CUSTOMER_REFRESH, INIT_CUSTOMER, SELECT_CUSTOMER} from "../actions/types";

const initialState = {
    customerList: [],
    visibility: 'visible',
    selectedIndex: -1,
    value: 'refresh',
    refreshDisabled: false
};

export default function(state = initialState, action){
    switch (action.type) {
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
                selectedIndex: action.payload.selectedIndex
            };
        default:
            return state;
    }
}