import {LOGIN, CREATE_ACCOUNT} from "./types";
import store from "../store";
let AWS = require( "../AWSHandler");
const serverUrl = "http://ec2-18-223-43-200.us-east-2.compute.amazonaws.com:3000/";

export const login = (userData) => dispatch => {

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



    xhttp.onreadystatechange = function(){
        if(xhttp.readyState === 4 && xhttp.status === 200){

            AWS.createProfileOnS3(userData.username, store.getState().parkingLot, function(S3_url){
                let xhttp2 = new XMLHttpRequest();

                xhttp2.onreadystatechange = function () {
                    if(xhttp.readyState === 4 && xhttp.status === 200){
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
                    }else if(xhttp.readyState === 4){
                        let err = JSON.parse(xhttp.response);
                        alert(err.message);
                    }
                };

                xhttp2.open("POST", serverUrl + "profiles/createProfile", true);
                xhttp2.setRequestHeader("Content-Type", "application/json");

                userData.S3_url = S3_url;
                xhttp2.send(JSON.stringify(userData));
            })

        }else if(xhttp.readyState === 4){
            let err = JSON.parse(xhttp.response);
            alert(err.message);
        }
    };

    xhttp.open("GET", serverUrl + "profiles/profileExists?username=" + userData.username, true);
    xhttp.send()

};

export const save = (userData) => {

};