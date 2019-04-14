import React, {Component} from 'react';





let parkingLotSrc = "https://s3.us-east-2.amazonaws.com/car-dealership/Images/ParkingLot.png";
class ParkingLot extends Component {

    constructor(props){
        super(props);

        this.state = {

        }
    }
    componentDidMount() {

    }

    render() {
        return (
            <div>
                <img style={parkingLotStyle} src={parkingLotSrc}/>
            </div>
        );
    }
}

const parkingLotStyle = {
    position: 'static',
    float: 'left',
    zIndex: '0'
};
export default ParkingLot;