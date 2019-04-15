import {combineReducers} from "redux";
import parkingLotReducer from './parkingLotReducer';
import popUpReducer from './popUpReducer';
import profileReducer from './profileReducer';
import sideBarReducer from './sideBarReducer';
import marketReducer from './marketReducer';
import inventoryReducer from './inventoryReducer';

export default combineReducers({
    parkingLot: parkingLotReducer,
    popUpState: popUpReducer,
    profile: profileReducer,
    sideBar: sideBarReducer,
    market: marketReducer,
    inventory: inventoryReducer
});
