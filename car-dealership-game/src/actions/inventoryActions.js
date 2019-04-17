import {ADD_CAR, SELECT_CAR} from "./types";
import store from '../store';

export const addCar = (car) => dispatch => {
      let carInventory = JSON.parse(JSON.stringify(store.getState().inventory.carInventory));
      carInventory.push(car);
      dispatch({
          type: ADD_CAR,
          payload: {
              carInventory
          }
      })
};

export const selectCar = (ind) => dispatch => {
    dispatch({
        type: SELECT_CAR,
        payload:{
            selectedIndex: ind
        }
    })
};