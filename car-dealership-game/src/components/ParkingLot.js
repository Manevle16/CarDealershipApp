import React, {Component} from 'react';
import aws from 'aws-sdk';
let config = require('../Utils/config');


aws.config.update({
    region: 'us-east-2',
    credentials: new aws.Credentials(config.akid, config.secret, null)
});

let S3 = new aws.S3({
    apiVersion: '2006-03-01',
    params: {Bucket: 'car-dealership'}
});

let parkingLotSrc = "https://s3.us-east-2.amazonaws.com/car-dealership/Images/ParkingLot.png";
class ParkingLot extends Component {

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