import React, {Component} from 'react';
import {connect} from "react-redux";
import styles from '../App.module.css';
import store from "../store";

class Inventory extends Component {
    constructor(props){
        super(props);

        this.state = {
            carInventory: [],
            selectedIndex: -1,
            visibility: 'hidden'
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.selectedIndex == null){
            this.setState({carInventory: nextProps.carInventory, visibility: nextProps.visibility});
        }
    }

    render() {
        const Options = this.props.carInventory.map(car => {
            if(car != null) {
                let output = car.Manufacturer.padEnd(15, "\u00A0") + " " + car.Model.padEnd(25, "\u00A0") + " "
                    + car.Year.toString().padEnd(6, "\u00A0") + " " + car.Color.padEnd(8, "\u00A0") + " $" + car.Price;
                return <option>{output}</option>;
            }
        });

        return (
            <div className={styles.panel} style={{height: '240px', top: '80px', visibility: this.state.visibility}}>
                <h2 className={styles.panelHeader}>Inventory</h2>
                <select className={styles.marketSelect} size='8'>
                    {Options}
                </select>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        carInventory: state.inventory.carInventory,
        selectedIndex: state.inventory.selectedIndex,
        visibility: state.inventory.visibility
    }
};

export default connect(mapStateToProps, null)(Inventory);