import {INIT_PARKING_LOT, PARK_CAR} from "./types";
import store from "../store";

export const initParkingLot = () => dispatch => {
    let parkingLotCords = [];
    let parkingLot = [];
    let yList = [100, 205, 395, 505, 695, 805];

    for(let i = 0; i < 6; i++){
        let rotation = "rotate(0deg)";
        if(i % 2 === 0){
            rotation = "rotate(180deg)";
        }
        parkingLotCords[i] = [];
        parkingLot[i] = [];
        let curX = 100;
        for(let j = 0; j < 16; j++){
            parkingLotCords[i][j] = {
                top: yList[i],
                left: curX,
                rotation
            };
            parkingLot[i][j] = null;
            curX += 50;
        }
    }

    dispatch({
        type: INIT_PARKING_LOT,
        payload: {
            parkingLot,
            parkingLotCords
        }
    })
};

export const parkCar = (car) => dispatch => {
    let parkingLot = JSON.parse(JSON.stringify(store.getState().parkingLot.parkingLot));

    let found = false;

    for(let i = 0; i < parkingLot.length; i++){
        for(let j = 0; j < parkingLot[i].length; j++){
            if(parkingLot[i][j] == null){
                parkingLot[i][j] = car;
                found = true;
                break;
            }
        }

        if(found){
            break;
        }
    }

    dispatch({
        type: PARK_CAR,
        payload: parkingLot
    })
};