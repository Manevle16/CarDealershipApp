import React, {Component} from 'react';
import {initMarket, removeCar, setRefreshDisabled, selectMarketCar} from "../actions/marketActions";
import {addCar} from "../actions/inventoryActions";
import {parkCar} from "../actions/parkingLotActions";
import {subtractMoney} from "../actions/profileActions";
import {connect} from "react-redux";
import styles from '../App.module.css';
import store from "../store";

class Market extends Component {

    constructor(props) {
        super(props);

        this.state = {
            marketCars: [],
            selectedIndex: null,
            visibility: 'hidden',
            refreshDisabled: false,
            value: "refresh"
        };

        this.buyCar = this.buyCar.bind(this);
        this.onChange = this.onChange.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        this.props.initMarket();
    }


    componentWillReceiveProps(nextProps) {
        if(!nextProps.visibility){
            this.setState({marketCars: nextProps.marketCars});
        }else {
            this.setState(nextProps);
        }
    }



    buyCar = (e) => {
        e.preventDefault();
        let marketCarsCopy = JSON.parse(JSON.stringify(this.state.marketCars));
        if(marketCarsCopy[this.state.selectedIndex].Price <= store.getState().profile.info.bankAccount) {
            this.props.subtractMoney(marketCarsCopy[this.state.selectedIndex].Price);
            this.props.addCar(marketCarsCopy[this.state.selectedIndex]);
            this.props.parkCar(marketCarsCopy[this.state.selectedIndex]);
            this.props.removeCar(this.state.selectedIndex, marketCarsCopy);
        }else{
            alert("Not enough balance in account for that");
        }
    };

    onChange = (e) => {
        this.props.selectMarketCar(e.target.selectedIndex);
    };

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

        this.props.initMarket();
    };

    render() {
        const marketOptions = this.props.marketCars.map(car => {
            let price = "$" + car.Price.toLocaleString();
            let output = car.Manufacturer.padEnd(15, "\u00A0") + " " + car.Model.padEnd(25, "\u00A0") + " "
                + car.Year.toString().padEnd(6, "\u00A0") + " " + car.Color.padEnd(8, "\u00A0") + price.padStart(10, "\u00A0");
            return <option key={car.key} style={{cursor: 'pointer'}}>{output}</option>;
        });

        const refreshButton = (function(refreshDisabled, value, refresh){
            if(!refreshDisabled){
                return( <button onClick={refresh} className={styles.buttonClass} disabled={refreshDisabled} style={{right: "10px", top: "10px"}}>{value}</button>);
            }else{
                return( <button className={styles.disabledButton} disabled={refreshDisabled} style={{right: "10px", top: "10px"}}>{value}</button>);
            }
        })(this.state.refreshDisabled, this.state.value, this.refresh);


        return (

            <div className={styles.panel} style={{height: '240px', top:'15px', visibility: this.state.visibility}}>
                <h2 className={styles.panelHeader}>Market</h2>
                {refreshButton}
                <form onSubmit={this.buyCar} >
                    <h3 className={styles.panelHeader} style={{top:'35px', left:'10px'}}>Maufacturer</h3>
                    <h3 className={styles.panelHeader} style={{top:'35px', left:'185px'}}>Model</h3>
                    <h3 className={styles.panelHeader} style={{top:'35px', left:'465px'}}>Year</h3>
                    <h3 className={styles.panelHeader} style={{top:'35px', left:'540px'}}>Color</h3>
                    <h3 className={styles.panelHeader} style={{top:'35px', left:'640px'}}>Price</h3>
                    <select className={styles.marketSelect} onChange={this.onChange}  size='6' style={{top:'60px'}}>
                        {marketOptions}
                    </select>
                    <button type='submit' className={styles.buttonClass} style={{top: '195px', left: '5px'}}>Buy Car</button>
                </form>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        marketCars: state.market.marketCars,
        selectedIndex: state.market.selectedIndex,
        visibility: state.market.visibility,
        refreshDisabled: state.market.refreshDisabled,
        value: state.market.value
    }
};


export default connect(mapStateToProps, {initMarket, removeCar, addCar, parkCar, setRefreshDisabled, selectMarketCar, subtractMoney})(Market);