import React, {Component} from 'react';
import {connect} from "react-redux";
import styles from "../App.module.css";

class Profile extends Component {
    constructor(props){
        super(props);

        this.state = {
            info: {
                username: '',
                bankAccount: 0,
                carsSold: 0,
                S3_Url: ''
            },
            panelInfo: {
                display: 'block'
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    render() {
        return (
            <div className={styles.panel} style={{height: '60px', top: '10px', display: this.state.panelInfo.display}}>
                <h3 className={styles.panelHeader}>User:</h3>
                <h3 className={styles.panelHeader} style={{left: '60px'}}>{this.state.info.username}</h3>
                <h3 className={styles.panelHeader} style={{top: '30px'}}>Account Balance:</h3>
                <h3 className={styles.panelHeader} style={{top: '30px', left: '165px'}}>{this.state.info.bankAccount}</h3>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    info: state.profile.info,
    panelInfo: state.profile.panelInfo
});

export default connect(mapStateToProps, null)(Profile);