import {INIT_MARKET, BUY_CAR} from "./types";

export const initMarket = () => dispatch =>{
    dispatch({
        type: INIT_MARKET,
        payload: {
            marketCars: [{
                key: 1,
                name: 'Click Me'
            },{
                key: 2,
                name: 'A'
            },{
                key: 3,
                name: 'B'
            },{
                key: 4,
                name: 'C'
            }],
            selectedIndex: 1
        }
    })
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
