import {DISABLE_CUSTOMER_REFRESH, INIT_CUSTOMER, SELECT_CUSTOMER, SET_HAGGLE_FORM,
    SALE_FAILED, SALE_SUCCEEDED, ADD_MONEY, REMOVE_CAR, UNPARK_CAR, UPDATE_CHANCE} from "./types";
import store from '../store';
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
                body[i].chances = 0;
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

export const setRefreshDisabled = (value, refreshDisabled, hagglePrice) => dispatch => {
    dispatch({
        type: DISABLE_CUSTOMER_REFRESH,
        payload: {
            value,
            refreshDisabled,
            hagglePrice
        }
    })
};

export const setHaggleForm = (hagglePrice, haggleVisibility) => dispatch => {
    dispatch({
        type: SET_HAGGLE_FORM,
        payload: {
            hagglePrice,
            haggleVisibility
        }
    })
};

export const tryOffer = (offer, carList, carInd, customerList, custInd) => dispatch => {
    let chance = 100;

    if(isNaN(offer) || offer === ''){
        alert("Offer must be an integer");
        dispatch({
            type: SALE_FAILED
        });
        alert("Sale failed");
        return;
    }
    offer = parseInt(offer);
    let man = carList[carInd].Manufacturer;
    let msrp = parseInt(carList[carInd].Price);
    let key = carList[carInd].key;
    let budget = customerList[custInd].Budget;
    let pref = customerList[custInd].Manufacturer_preference;

    if(offer > budget){
        alert("That is out of his budget");
        customerList[custInd].chances += 1;
        dispatch({
            type: SALE_FAILED
        });
        alert("Sale failed");
        return;
    }

    if(man !== pref){
        chance -= 20;
    }

    let difP = 0;
    if(offer > msrp) {
        difP = parseInt((1 - Math.pow((msrp / offer), 2)) * 100);
        console.log(difP);
    }


    chance -= difP;

    console.log(chance);
    if(chance < 0){
        customerList[custInd].chances += 1;
        dispatch({
            type: SALE_FAILED
        });
        alert("Sale failed");
        return;
    }
    let rand = Math.floor(Math.random() * 101);

    if(rand <= chance){

        let newCustomerList = customerList.slice(0);
        newCustomerList.splice(custInd, 1);

        dispatch({
            type: ADD_MONEY,
            payload: offer
        });

        dispatch({
            type: SALE_SUCCEEDED,
            payload: newCustomerList
        });

        dispatch({
            type: REMOVE_CAR,
            payload: carInd
        });

        dispatch({
            type: UNPARK_CAR,
            payload: key
        });

    }else{
        customerList[custInd].chances += 1;
        dispatch({
            type: SALE_FAILED
        });
        alert("Sale failed");
    }
};

export const updateChance = (offer, carList, carInd, customerList, custInd) => dispatch => {
    let chance = 100;

    if(isNaN(offer) || offer === ''){
        dispatch({
            type: UPDATE_CHANCE,
            payload: ''
        });
        return;
    }
    offer = parseInt(offer);
    let man = carList[carInd].Manufacturer;
    let msrp = parseInt(carList[carInd].Price);
    let budget = customerList[custInd].Budget;
    let pref = customerList[custInd].Manufacturer_preference;

    if(offer > budget){
        dispatch({
            type: UPDATE_CHANCE,
            payload: 0
        });
        return;
    }

    if(man !== pref){
        chance -= 20;
    }

    let difP = 0;
    if(offer > msrp) {
        difP = parseInt((1 - Math.pow((msrp / offer), 2)) * 100);
        console.log(difP);
    }


    chance -= difP;

    console.log(chance);
    if(chance < 0){
        dispatch({
            type: UPDATE_CHANCE,
            payload: 0
        });
    }else{
        dispatch({
            type: UPDATE_CHANCE,
            payload: chance
        })
    }

};
