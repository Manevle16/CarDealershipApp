import React, {Component} from 'react';
import ParkingLot from './components/ParkingLot';
import SideBarForm from './components/SideBarForm';
import PopUpForm from './components/PopUpForm';
import Profile from './components/Profile';
import Market from './components/Market';
import Inventory from './components/Inventory';
import Customers from './components/Customers';
import {Provider} from 'react-redux';
import store from './store';

class App extends Component {
    render() {
        return (
            <Provider store={store} >
                <div className="App">
                    <PopUpForm/>
                    <ParkingLot/>
                    <div style={sideBarStyle}>
                        <SideBarForm/>
                        <Profile/>
                        <Market/>
                        <Inventory/>
                        <Customers/>
                    </div>
                </div>
            </Provider>
        );
    }
}

const sideBarStyle = {
    position: 'relative',
    background: '#344955',
    height: '990px',
    width: '45%',
    left: '1000px',
    borderStyle: 'solid',
    borderWidth: '6px',
    zIndex: 0
};

export default App;
