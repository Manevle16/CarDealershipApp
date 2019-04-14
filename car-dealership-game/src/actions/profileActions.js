import {LOGIN, CREATE_ACCOUNT, SAVE, ADD_MONEY} from "./types";
import store from "../store";
let AWS = require( "../AWSHandler");
let config = require("../Utils/config");

const serverUrl = "http://ec2-18-223-43-200.us-east-2.compute.amazonaws.com:3000/";

export const addMoney = () => dispatch => {
    let profile = store.getState().profile;
    profile.bankAccount += 1000;
    dispatch({
        type: ADD_MONEY,
        payload: profile
    })
};

export const login = (userData) => dispatch => {

    userData.username = userData.username.trim();
    userData.password = userData.password.trim();

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(xhttp.readyState === 4 && xhttp.status === 200){
            let profile = JSON.parse(xhttp.response)[0];

            AWS.getProfileFromS3(profile.s3_url, function(data){
                let payload = {
                    username: userData.username,
                    carsSold: data.carsSold,
                    bankAccount: data.bankAccount,
                    S3_url: profile.s3_url
                };

                dispatch({
                    type: LOGIN,
                    payload: payload
                });
            });
        }else if(xhttp.readyState === 4){
            let err = JSON.parse(xhttp.response);
            alert(err.message);
        }
    };

    xhttp.open("GET", serverUrl + "profiles/login?username=" + userData.username + "&password=" + userData.password, true);
    xhttp.send();
};

export const createAccount = (userData) => dispatch => {
    let xhttp = new XMLHttpRequest();
    userData.username = userData.username.trim();
    userData.password = userData.password.trim();


    xhttp.onreadystatechange = function(){
        if(xhttp.readyState === 4 && xhttp.status === 200){

            AWS.createProfileOnS3(userData.username, store.getState().parkingLot, function(S3_url){
                let xhttp2 = new XMLHttpRequest();

                xhttp2.onreadystatechange = function () {
                    if(xhttp2.readyState === 4 && xhttp2.status === 200){
                        let payload = {
                            username: userData.username,
                            carsSold: 0,
                            bankAccount: 100000,
                            S3_url: S3_url
                        };

                        dispatch({
                            type: CREATE_ACCOUNT,
                            payload: payload
                        });
                    }else if(xhttp2.readyState === 4){
                        let err = JSON.parse(xhttp2.response);
                        alert(err.message);
                    }
                };

                xhttp2.open("POST", serverUrl + "profiles/createProfile", true);
                xhttp2.setRequestHeader("Content-Type", "application/json");

                userData.S3_url = S3_url;
                xhttp2.send(JSON.stringify(userData));

                let xhttp3 = new XMLHttpRequest();

                xhttp3.onreadystatechange = function () {
                    if(xhttp3.readyState === 4 && xhttp3.status === 200){
                        console.log("Employee added");
                    }else if(xhttp3.readyState === 4){
                        let err = JSON.parse(xhttp3.response);
                        alert(err.message);
                    }
                };

                xhttp3.open("POST", serverUrl + "employee/addEmployee", true);
                xhttp3.setRequestHeader("Content-Type", "application/json");
                xhttp3.send(JSON.stringify({username: userData.username}));
            })

        }else if(xhttp.readyState === 4){
            let err = JSON.parse(xhttp.response);
            alert(err.message);
        }
    };

    xhttp.open("GET", serverUrl + "profiles/profileExists?username=" + userData.username, true);
    xhttp.send()

};

export const save = () => dispatch => {
    let profile = {
        username: store.getState().profile.username,
        carsSold: store.getState().profile.carsSold,
        bankAccount: store.getState().profile.bankAccount,
        parkingLot: store.getState().parkingLot.parkingLot
    };

    AWS.saveProfileInS3(profile);

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(xhttp.readyState === 4 && xhttp.status === 200){
            console.log("Employee updated");
        }else if(xhttp.readyState === 4){
            let err = JSON.parse(xhttp.response);
            alert(err.message);
        }
    };

    xhttp.open("POST", serverUrl + "employee/updateEmployee", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({username: profile.username, carsSold: profile.carsSold, key: config.key}));

    dispatch({
        type: SAVE
    });
};