import {ADD_CAR, SELECT_CAR, REMOVE_CAR} from "./types";
import store from '../store';

export const addCar = (car) => dispatch => {

      dispatch({
          type: ADD_CAR,
          payload: car
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
