import React, {Component} from 'react';
import ParkingLot from './components/ParkingLot';
import Car from './components/Car';
import SideBarForm from './components/SideBarForm';
import PopUpForm from './components/PopUpForm';
import Profile from './components/Profile';
import Market from './components/Market';
import {Provider} from 'react-redux';
import store from './store';
import styles from './App.module.css';

class App extends Component {
    render() {
        return (
            <Provider store={store} >
                <div className="App">
                    <PopUpForm/>
                    <ParkingLot/>
                    <Car/>
                    <div style={sideBarStyle}>
                        <h1 style={headerStyle}>Tools</h1>
                        <SideBarForm/>
                        <Profile/>
                        <Market/>
                    </div>
                </div>
            </Provider>
        );
    }
}

const sideBarStyle = {
    position: 'absolute',
    background: '#344955',
    height: '990px',
    width: '650px',
    left: '1000px',
    borderStyle: 'solid',
    borderWidth: '6px',
    zIndex: -1
};

const headerStyle = {
    position: 'absolute',
    left: '280px',
    color: 'white'
};

export default App;
