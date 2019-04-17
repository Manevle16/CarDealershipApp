import React, {Component} from 'react';
import styles from '../App.module.css';
import {connect} from "react-redux";
import {initCustomers, selectCustomer, setRefreshDisabled, setHaggleForm, tryOffer} from "../actions/customerActions";
import store from "../store";

class Customers extends Component {
    constructor(props){
        super(props);

        this.state = {
            customerList: [],
            visibility: 'visible',
            selectedIndex: -1,
            refreshDisabled: false,
            value: "refresh",
            haggleVisibility: "none",
            hagglePrice: ''
        };

        this.refresh = this.refresh.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.changeHaggle = this.changeHaggle.bind(this);
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

    onClick = () => {
        if(this.state.selectedIndex < 0  || store.getState().inventory.selectedIndex < 0){
            return alert("A car from inventory and customer must be selected to start haggling");
        }
        this.props.setHaggleForm('', "block");
    };

    onClose = () => {
        this.props.setHaggleForm('', 'none');
    };

    onSubmit = (e) => {
        e.preventDefault();
        console.log(store.getState());
        this.props.tryOffer(this.state.hagglePrice, store.getState().inventory.carInventory, store.getState().inventory.selectedIndex,
            this.state.customerList, this.state.selectedIndex);

    };

    changeHaggle = (e) => {
        this.setState( {hagglePrice:  e.target.value});
    };

    render() {
        //Dynamic Rendering Functions
        const customers = this.props.customerList.map(customer => {
            let fullName = customer.First_name + " " + customer.Last_name;
            let price = "$" + customer.Budget.toLocaleString();
            let output = fullName.padEnd(25, "\u00A0") + customer.Manufacturer_preference.padEnd(25, "\u00A0") +
                price.padStart(10, "\u00A0");
            return <option key={customer.key} style={{cursor: 'pointer'}}>{output}</option>;
        });

        const refreshButton = (function(refreshDisabled, value, refresh){
            if(!refreshDisabled){
                return( <button onClick={refresh} className={styles.buttonClass} disabled={refreshDisabled} style={{right: "10px", top: "10px"}}>{value}</button>);
            }else{
                return( <button className={styles.disabledButton} disabled={refreshDisabled} style={{right: "10px", top: "10px"}}>{value}</button>);
            }
        })(this.state.refreshDisabled, this.state.value, this.refresh);

        const carName = ((carInventory, ind, customers, custInd) => {
            if(carInventory[ind] != null) {
                let man = "Manufacturer: " + carInventory[ind].Manufacturer;
                let mod = "Model: " + carInventory[ind].Model;
                let mPrice = "Market Price: $" + carInventory[ind].Price.toLocaleString();
                let customer = "Customer: " + customers[custInd].First_name + " " + customers[custInd].Last_name;
                let budget = "Budget: $" + customers[custInd].Budget.toLocaleString();
                let manPref = "Manufacturer Preference: " + customers[custInd].Manufacturer_preference;
                return [<h3 style={{top: '-20px', left: '5px', position: 'relative'}}>{man}</h3>,
                        <h3 style={{top: '-30px', left: '5px', position: 'relative'}}>{mod}</h3>,
                        <h3 style={{top: '-75px', left: '400px', position: 'relative'}}>{mPrice}</h3>,
                        <hr style={{top: '-90px', position: 'relative', border: '2px solid #000'}}/>,
                        <h3 style={{top: '-100px', left: '5px', position: 'relative'}}>{customer}</h3>,
                        <h3 style={{top: '-112px', left: '400px', position: 'relative'}}>{budget}</h3>,
                        <h3 style={{top: '-155px', left: '5px', position: 'relative'}}>{manPref}</h3>];
            }
        })(store.getState().inventory.carInventory, store.getState().inventory.selectedIndex, this.state.customerList, this.state.selectedIndex);


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
                <button onClick={this.onClick} className={styles.buttonClass} style={{top: '195px', left: '5px'}}>Haggle</button>
                <div style={{display: this.state.haggleVisibility}}>
                    <form onSubmit={this.onSubmit} style={popUpStyle} id='haggleForm'>
                        <button type='button' onClick={this.onClose} className={styles.xButton} style={{top: '5px'}}>X</button>
                        {carName}
                        <h3 style={{top: '-108px', left: '5px', position: 'relative'}}>Desired Selling Price:</h3>
                        <input className={styles.formInput} style={{top: '-150px', left: '190px', height: '20px'}} value={this.state.hagglePrice} onChange={this.changeHaggle}/>
                        <button type='submit' className={styles.buttonClass} style={confirmButtonStyle}>Offer Sale</button>
                    </form>
                </div>
            </div>
        );
    }
}

const confirmButtonStyle = {
    background: '#fff',
    position: 'absolute',
    broderWidth: '6px',
    borderStyle: 'solid',
    top: '190px',
    left: '400px'
};

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
    overflow: "visible",

};

const mapStateToProps = (state) => {
    return {
        customerList: state.customer.customerList,
        selectedIndex: state.customer.selectedIndex,
        visibility: state.customer.visibility,
        refreshDisabled: state.customer.refreshDisabled,
        value: state.customer.value,
        hagglePrice: state.customer.hagglePrice,
        haggleVisibility: state.customer.haggleVisibility
    }
};

export default connect(mapStateToProps, {initCustomers, selectCustomer, setRefreshDisabled, setHaggleForm, tryOffer})(Customers);