import React, {Component} from 'react';
import {connect} from "react-redux";
import {initParkingLot} from "../actions/parkingLotActions";

class ParkingLot extends Component {

    constructor(props){
        super(props);

        this.state = {
            parkingLot: [[]],
            parkingLotCords: [[]]
        }
    }

    componentDidMount() {
        this.props.initParkingLot();
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    render() {
        return (
            <div>
                <img style={parkingLotStyle} src="https://s3.us-east-2.amazonaws.com/car-dealership/Images/ParkingLot.png"/>
            </div>
        );
    }
}

const parkingLotStyle = {
    position: 'static',
    float: 'left',
    zIndex: '0'
};

const mapStateToProps = (state) => {
    return state.parkingLot;
};

export default connect(mapStateToProps, {initParkingLot})(ParkingLot);