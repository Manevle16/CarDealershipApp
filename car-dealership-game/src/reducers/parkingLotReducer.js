import {BUY_CAR} from "../actions/types";


const initialState = {
    parkingLotCords: initParkLotCords(),
    parkingLot: initParkLot()
};

export default function(state = initialState, action){
    switch(action.type) {
        default:
            return state;
    }
}

function initParkLotCords() {
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

function initParkLot() {
    let lot = [];

    for(let i = 0; i < 6; i++){
        lot[i] = [];
        for(let j = 0; j < 16; j++){
            lot[i][j] = null;
        }
    }
    return lot;
}