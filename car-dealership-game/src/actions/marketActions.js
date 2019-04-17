import {INIT_MARKET, BUY_CAR} from "./types";
import uuid from 'uuid';

let config = require("../Utils/config");
let serverUrl = config.server;

export const initMarket = () => dispatch => {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(xhttp.readyState === 4 && xhttp.status === 200){
            let body = JSON.parse(xhttp.response);
            console.log(body);
            for(let i = 0; i < body.length; i++){
                body[i].key = uuid.v4();
            }
            dispatch({
                type: INIT_MARKET,
                payload: {
                    marketCars: body,
                    selectedIndex: null
                }
            })
        }else if(xhttp.readyState === 4){
            let err = JSON.parse(xhttp.response);
            alert(err.message);
        }
    };

    xhttp.open("GET", serverUrl + "car/getRandom15Cars");
    xhttp.send();
};

export const removeCar = (ind, marketCars) => dispatch => {
    marketCars.splice(ind, 1);
    dispatch({
        type: BUY_CAR,
        payload: {
            marketCars,
            selectedIndex: -1
        }
    })
};
