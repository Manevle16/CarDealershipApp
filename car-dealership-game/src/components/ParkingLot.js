import React, {Component} from 'react';
import {connect} from "react-redux";
import {initParkingLot} from "../actions/parkingLotActions";
let imgUrl = "https://s3.us-east-2.amazonaws.com/car-dealership/Images/Birds-Eye/";

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
        if(nextProps.parkingLotCords == null){
            this.setState({parkingLot: nextProps.parkingLot});
        }else {
            this.setState(nextProps);
        }
    }

    render() {

        const ParkedCars = this.props.parkingLot.map((lots, y) => {
            return lots.map((car, x) => {
                if(car != null){
                    let imgSrc = imgUrl + car.Color + "-car.png";
                    return <img src={imgSrc} style={{top: this.state.parkingLotCords[y][x].top, left: this.state.parkingLotCords[y][x].left, position: 'absolute',
                                                    transform: this.state.parkingLotCords[y][x].rotation }}/>
                }
            });
        });

        return (
            <div>
                <img style={parkingLotStyle} src="https://s3.us-east-2.amazonaws.com/car-dealership/Images/ParkingLot.png"/>
                {ParkedCars}
            </div>
        );
    }
}

const parkingLotStyle = {
    position: 'relative',
    float: 'left',
    zIndex: '-1'
};

const mapStateToProps = (state) => {
    return {
        parkingLot: state.parkingLot.parkingLot,
        parkingLotCords: state.parkingLot.parkingLotCords
    }
};

export default connect(mapStateToProps, {initParkingLot})(ParkingLot);