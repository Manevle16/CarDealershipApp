import {INIT_PARKING_LOT} from "./types";

export const initParkingLot = () => dispatch => {
    let parkingLotCords = [];
    let parkingLot = [];
    let yList = [100, 205, 395, 505, 695, 805];

    for(let i = 0; i < 6; i++){
        parkingLotCords[i] = [];
        parkingLot[i] = [];
        let curX = 100;
        for(let j = 0; j < 16; j++){
            parkingLotCords[i][j] = {
                top: yList[i],
                left: curX
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
