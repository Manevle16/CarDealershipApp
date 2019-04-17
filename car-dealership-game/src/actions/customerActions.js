import {DISABLE_CUSTOMER_REFRESH, INIT_CUSTOMER, SELECT_CUSTOMER, SET_HAGGLE_FORM} from "./types";
import uuid from "uuid";

let serverUrl = require('../Utils/config').server;

export const initCustomers = () => dispatch => {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(xhttp.readyState === 4 && xhttp.status === 200){
            let body = JSON.parse(xhttp.response);
            console.log(body);
            for(let i = 0; i < body.length; i++){
                body[i].key = uuid.v4();
            }
            dispatch({
                type: INIT_CUSTOMER,
                payload: {
                    customerList: body
                }
            })
        }else if(xhttp.readyState === 4){
            let err = JSON.parse(xhttp.response);
            alert(err.message);
        }
    };

    xhttp.open("GET", serverUrl + "customer/getRandom20Customers");
    xhttp.send();

};

export const selectCustomer = (ind) => dispatch => {
    dispatch({
        type: SELECT_CUSTOMER,
        payload:{
            selectedIndex: ind
        }
    })
};

export const setRefreshDisabled = (value, refreshDisabled) => dispatch => {
    dispatch({
        type: DISABLE_CUSTOMER_REFRESH,
        payload: {
            value,
            refreshDisabled
        }
    })
};

export const setHaggleForm = () => dispatch => {

};