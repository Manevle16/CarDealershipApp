import {SHOW_FORM, CLOSE_FORM} from "./types";

export const showForm = (newState) => dispatch => {
    dispatch({
        type: SHOW_FORM,
        payload: newState
    })
};

export const closeForm = (newState) => dispatch => {
    dispatch({
        type: CLOSE_FORM,
        payload: newState
    })
};

