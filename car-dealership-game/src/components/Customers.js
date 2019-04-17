import React, {Component} from 'react';
import styles from '../App.module.css';
import {connect} from "react-redux";
import {initCustomers} from "../actions/customerActions";

class Customers extends Component {
    constructor(props){
        super(props);

        this.state = {
            customerList: [],
            visibility: 'visible',
            selectedIndex: null
        }
    }

    componentDidMount() {
        this.props.initCustomers();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(!nextProps.visibility){
            this.setState({customerList: nextProps.customerList});
        }else{
            this.setState(nextProps);
        }
    }

    render() {
        const customers = this.props.customerList.map(customer => {
            let fullName = customer.First_name + " " + customer.Last_name;
            let output = fullName.padEnd(25, "\u00A0") + customer.Manufacturer_preference.padEnd(25, "\u00A0") +
                customer.Budget;
            return <option key={customer.key}>{output}</option>;
        });
        return (
            <div className={styles.panel} style={{height: '220px', top:'85px', visibility: this.state.visibility}}>
                <h2 className={styles.panelHeader}>Customers</h2>
                <h3 className={styles.panelHeader} style={{top:'35px', left:'10px'}}>Full Name</h3>
                <h3 className={styles.panelHeader} style={{top:'35px', left:'280px'}}>Desired Maufacturer</h3>
                <h3 className={styles.panelHeader} style={{top:'35px', left:'550px'}}>Budget</h3>
                <select className={styles.marketSelect} size='6' style={{top:'60px'}}>
                    {customers}
                </select>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        customerList: state.customer.customerList,
        selectedIndex: state.customer.selectedIndex,
        visibility: state.customer.visibility
    }
};

export default connect(mapStateToProps, {initCustomers})(Customers);