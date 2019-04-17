import {INIT_CUSTOMER} from "./types";
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
                    customerList: body,
                    selectedIndex: null,
                    visibility: 'visible'
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