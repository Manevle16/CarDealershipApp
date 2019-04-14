import React, {Component} from 'react';
import ParkingLot from './components/ParkingLot';
import Car from './components/Car';
import SideBarForm from './components/SideBarForm';
import PopUpForm from './components/PopUpForm';
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
                    <SideBarForm/>
                </div>
            </Provider>
        );
    }
}

export default App;
