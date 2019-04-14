import React, {Component} from 'react';
import {connect} from "react-redux";

class Profile extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            bankAccount: 0,
            carsSold: 0,
            S3_Url: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.profile;
};

export default connect(mapStateToProps, null)(Profile);