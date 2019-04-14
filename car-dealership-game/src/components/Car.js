import React, {Component} from 'react';

let carSrc = "https://s3.us-east-2.amazonaws.com/car-dealership/Images/Birds-Eye/black-car.png"
class Car extends Component {
    render() {
        return (
            <div>
                <img style={carStyle} src={carSrc}/>
            </div>
        );
    }
}

let carStyle = {
    position: 'absolute',
    top: '100px',
    left: '100px',
    zIndex: '1'
};

export default Car;