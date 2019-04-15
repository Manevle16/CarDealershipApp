import React, {Component} from 'react';
import {initMarket, removeCar} from "../actions/marketActions";
import {connect} from "react-redux";
import styles from '../App.module.css';

class Market extends Component {

    constructor(props) {
        super(props);

        this.state = {
            marketCars: [],
            selectedIndex: null
        };

        this.buyCar = this.buyCar.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.props.initMarket();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.setState(nextProps);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log(nextProps);
        console.log('test');
    }

    buyCar = (e) => {
        e.preventDefault();
        this.props.removeCar(this.state.selectedIndex, JSON.parse(JSON.stringify(this.state.marketCars)));
        e.target[0].selectedIndex = -1;
    };

    onChange = (e) => {
        this.setState({selectedIndex: e.target.selectedIndex});
    };

    render() {
        const marketOptions = this.props.marketCars.map(car => (
            <option key={car.key}>{car.name}</option>
        ));

        return (

            <div className={styles.panel} style={{height: '240px', top:'75px'}}>
                <h2 className={styles.panelHeader}>Market</h2>
                <form onSubmit={this.buyCar}>
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
        selectedIndex: state.market.selectedIndex
    }
};


export default connect(mapStateToProps, {initMarket, removeCar})(Market);