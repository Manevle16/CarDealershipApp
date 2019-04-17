import React, {Component} from 'react';
import styles from '../App.module.css';
import {connect} from "react-redux";
import {initCustomers, selectCustomer, setRefreshDisabled} from "../actions/customerActions";
import store from "../store";

class Customers extends Component {
    constructor(props){
        super(props);

        this.state = {
            customerList: [],
            visibility: 'visible',
            selectedIndex: null,
            refreshDisabled: false,
            value: "refresh",
            haggleVisibility: "visible",
            hagglePrice: ''
        };

        this.refresh = this.refresh.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.props.initCustomers();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState(nextProps);
    }

    refresh = () =>{
        this.props.setRefreshDisabled(30, true);
        let count = 30;
        let counter = setInterval(() => {
            count--;
            this.props.setRefreshDisabled(count, true);
            if(count === 0){
                this.props.setRefreshDisabled("refresh", false);
                clearInterval(counter);
            }
        }, 1000);

        this.props.initCustomers();
    };

    onChange = (e) => {
        this.props.selectCustomer(e.target.selectedIndex);
    };

    render() {
        const customers = this.props.customerList.map(customer => {
            let fullName = customer.First_name + " " + customer.Last_name;
            let output = fullName.padEnd(25, "\u00A0") + customer.Manufacturer_preference.padEnd(25, "\u00A0") +
                customer.Budget;
            return <option key={customer.key}>{output}</option>;
        });

        const refreshButton = (function(refreshDisabled, value, refresh){
            if(!refreshDisabled){
                return( <button onClick={refresh} className={styles.buttonClass} disabled={refreshDisabled} style={{right: "10px", top: "10px"}}>{value}</button>);
            }else{
                return( <button className={styles.disabledButton} disabled={refreshDisabled} style={{right: "10px", top: "10px"}}>{value}</button>);
            }
        })(this.state.refreshDisabled, this.state.value, this.refresh);

        return (
            <div className={styles.panel} style={{height: '240px', top:'25px', visibility: this.state.visibility}}>
                {refreshButton}
                <h2 className={styles.panelHeader}>Customers</h2>
                <h3 className={styles.panelHeader} style={{top:'35px', left:'10px'}}>Full Name</h3>
                <h3 className={styles.panelHeader} style={{top:'35px', left:'280px'}}>Desired Maufacturer</h3>
                <h3 className={styles.panelHeader} style={{top:'35px', left:'550px'}}>Budget</h3>
                <select onChange={this.onChange} className={styles.marketSelect} size='6' style={{top:'60px'}}>
                    {customers}
                </select>
                <button className={styles.buttonClass} style={{top: '195px', left: '5px'}}>Haggle</button>
                <div style={popUpStyle}>
                    <form id='haggleForm' style={{position: 'relative', display: this.state.haggleVisibility}}>
                        <h2>{store.getState().inventory.carInventory[store.getState().inventory.selectedIndex]}</h2>
                    </form>
                </div>
            </div>
        );
    }
}

const popUpStyle = {
    position: 'absolute',
    background: '#F9AA33',
    height: '250px',
    width: '700px',
    zIndex: '3',
    left: '-400px',
    top: '-400px',
    borderWidth: '6px',
    borderStyle: 'solid',
    overflow: "visible"
};

const mapStateToProps = (state) => {
    return {
        customerList: state.customer.customerList,
        selectedIndex: state.customer.selectedIndex,
        visibility: state.customer.visibility,
        refreshDisabled: state.customer.refreshDisabled,
        value: state.customer.value
    }
};

export default connect(mapStateToProps, {initCustomers, selectCustomer, setRefreshDisabled})(Customers);