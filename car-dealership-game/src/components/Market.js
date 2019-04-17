import React, {Component} from 'react';
import {initMarket, removeCar} from "../actions/marketActions";
import {addCar} from "../actions/inventoryActions";
import {parkCar} from "../actions/parkingLotActions";
import {connect} from "react-redux";
import styles from '../App.module.css';

class Market extends Component {

    constructor(props) {
        super(props);

        this.state = {
            marketCars: [],
            selectedIndex: null,
            visibility: 'visible',
            refreshDisabled: false,
            value: "refresh"
        };

        this.buyCar = this.buyCar.bind(this);
        this.onChange = this.onChange.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        let count = 0;
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
        this.props.addCar(marketCarsCopy[this.state.selectedIndex]);
        this.props.parkCar(marketCarsCopy[this.state.selectedIndex]);
        this.props.removeCar(this.state.selectedIndex, marketCarsCopy);
        e.target[0].selectedIndex = -1;
    };

    onChange = (e) => {
        this.setState({selectedIndex: e.target.selectedIndex});
    };

    refresh = () =>{
        this.setState({refreshDisabled: true});
        let count = 30;
        let counter = setInterval(() => {
            count--;
            this.setState({value: count});
            console.log(count);
            if(count === 0){
                this.setState({value: "refresh", refreshDisabled: false});
                clearInterval(counter);
            }
        }, 1000);

        this.props.initMarket();
    };

    render() {
        const marketOptions = this.props.marketCars.map(car => {
            let output = car.Manufacturer.padEnd(15, "\u00A0") + " " + car.Model.padEnd(25, "\u00A0") + " "
                + car.Year.toString().padEnd(6, "\u00A0") + " " + car.Color.padEnd(8, "\u00A0") + " $" + car.Price;
            return <option key={car.key}>{output}</option>;
        });

        const refreshButton = (function(refreshDisabled, value, refresh){
            if(!refreshDisabled){
                return( <button onClick={refresh} className={styles.buttonClass} disabled={refreshDisabled} style={{right: "10px", top: "3px"}}>{value}</button>);
            }else{
                return( <button className={styles.disabledButton} disabled={refreshDisabled} style={{right: "10px", top: "3px"}}>{value}</button>);
            }
        })(this.state.refreshDisabled, this.state.value, this.refresh);


        return (

            <div className={styles.panel} style={{height: '240px', top:'75px', visibility: this.state.visibility}}>
                <h2 className={styles.panelHeader}>Market</h2>
                {refreshButton}
                <form onSubmit={this.buyCar} >
                    <select className={styles.marketSelect} onChange={this.onChange}  size='6'>
                        {marketOptions}
                    </select>
                    <button type='submit' className={styles.buttonClass} style={{top: '190px', left: '5px'}}>Buy Car</button>
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


export default connect(mapStateToProps, {initMarket, removeCar, addCar, parkCar})(Market);