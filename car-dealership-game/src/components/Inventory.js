import React, {Component} from 'react';
import {connect} from "react-redux";
import styles from '../App.module.css';

class Inventory extends Component {
    constructor(props){
        super(props);

        this.state = {
            carInventory: [],
            selectedIndex: -1
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.selectedIndex == null){
            this.setState({carInventory: nextProps.carInventory});
        }
    }

    render() {
        const Options = this.props.carInventory.map(car => (
            <option key={car.key}>{car.name}</option>
        ));

        return (
            <div className={styles.panel} style={{height: '240px', top: '80px'}}>
                <h2 className={styles.panelHeader}>Inventory</h2>
                <select className={styles.marketSelect} size='6'>
                    {Options}
                </select>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        carInventory: state.inventory.carInventory,
        selectedIndex: state.inventory.selectedIndex
    }
};

export default connect(mapStateToProps, null)(Inventory);