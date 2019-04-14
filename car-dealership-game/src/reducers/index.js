import {combineReducers} from "redux";
import parkingLotReducer from './parkingLotReducer';
import popUpReducer from './popUpReducer';
import profileReducer from './profileReducer';


export default combineReducers({
    parkingLot: parkingLotReducer,
    popUpState: popUpReducer,
    profile: profileReducer
});
