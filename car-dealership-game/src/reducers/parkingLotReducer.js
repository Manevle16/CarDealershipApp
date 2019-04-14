import {BUY_CAR} from "../actions/types";


const initialState = {
    parkingLot: initParkLot()
};

export default function(state = initialState, action){
    console.log(state);
    switch(action.type) {
        default:
            return state;
    }
}

function initParkLot() {
    let lot = [];

    let yList = [100, 205, 395, 505, 695, 805];

    for(let i = 0; i < 6; i++){
        lot[i] = [];
        let curX = 100;
        for(let j = 0; j < 16; j++){
            lot[i][j] = {
                top: yList[i],
                left: curX
            };
            curX += 50;
        }
    }
    return lot;
}