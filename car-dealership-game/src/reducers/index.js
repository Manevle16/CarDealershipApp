import {combineReducers} from "redux";
import parkingLotReducer from './parkingLotReducer';
import popUpReducer from './popUpReducer';
import profileReducer from './profileReducer';
import sideBarReducer from './sideBarReducer';
import marketReducer from './marketReducer';

export default combineReducers({
    parkingLot: parkingLotReducer,
    popUpState: popUpReducer,
    profile: profileReducer,
    sideBar: sideBarReducer,
    market: marketReducer
});
