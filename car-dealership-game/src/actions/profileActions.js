import {LOGIN} from "./types";

const serverUrl = "http://ec2-18-223-43-200.us-east-2.compute.amazonaws.com:3000/";

export const login = (userData) => dispatch => {

    console.log(serverUrl + "profiles/login?username=" + userData.username + "&password=" + userData.password);
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(xhttp.readyState === 4 && xhttp.status === 200){
            let profile = JSON.parse(xhttp.response);

            console.log(profile);
        }else if(xhttp.readyState === 4){
            let err = JSON.parse(xhttp.response);
            alert(err.message);
        }
    };

    xhttp.open("GET", serverUrl + "profiles/login?username=" + userData.username + "&password=" + userData.password, true);
    xhttp.send();
};