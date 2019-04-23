import React, {Component} from 'react';
import {connect} from "react-redux";
import styles from '../App.module.css';
import {selectCar} from "../actions/inventoryActions";

class Inventory extends Component {
    constructor(props){
        super(props);

        this.state = {
            carInventory: [],
            selectedIndex: -1,
            visibility: 'hidden'
        };

        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    onChange = (e) => {
        this.props.selectCar(e.target.selectedIndex);
    };

    render() {
        const Options = this.props.carInventory.map(car => {
            if(car != null) {
                let price = "$" + car.Price.toLocaleString();
                let output = car.Manufacturer.padEnd(15, "\u00A0") + " " + car.Model.padEnd(25, "\u00A0") + " "
                    + car.Year.toString().padEnd(6, "\u00A0") + " " + car.Color.padEnd(8, "\u00A0") + price.padStart(10, "\u00A0");
                return <option key={car.key} style={{cursor: 'pointer'}}>{output}</option>;
            }
        });

        return (
            <div className={styles.panel} style={{height: '180px', top: '20px', visibility: this.state.visibility}}>
                <h2 className={styles.panelHeader}>Inventory</h2>
                <select onChange={this.onChange} className={styles.marketSelect} size='6'>
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

export default connect(mapStateToProps, {selectCar})(Inventory);