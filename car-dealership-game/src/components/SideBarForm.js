import React, {Component} from 'react';
import styles from '../App.module.css';
import {connect} from "react-redux";
import {showForm} from "../actions/popUpActions";

class SideBarForm extends Component {
    constructor(props){
        super(props);

        this.displaySignUp = this.displaySignUp.bind(this);
        this.displayLogin = this.displayLogin.bind(this);
    }

    displaySignUp = () => {
        this.props.showForm({
            visibility: {
                popUpHidden: false,
                loginVisibility: 'none',
                signUpVisibility: 'block'
            },
            formInput: {
                username: '',
                password: ''
            }
        })
    };

    displayLogin = () =>{
        this.props.showForm({
            visibility: {
                popUpHidden: false,
                loginVisibility: 'block',
                signUpVisibility: 'none'
            },
            formInput: {
                username: '',
                password: ''
            }
        })
    };

    render() {
        return (
            <div style={sideBarStyle}>
                <h1 style={headerStyle}>Tools</h1>
                <div className={styles.panel} style={{height: '85px', top: '65px'}}>
                    <h2 style={{position: 'absolute', left: '5px', marginTop: '0px', color: 'white'}}>Profile</h2>
                    <button onClick={this.displayLogin} className={styles.buttonClass} style={{top: '40px', left: '120px'}}>Login</button>
                    <button onClick={this.displaySignUp} className={styles.buttonClass} style={{top: '40px', left: '6px'}}>Sign Up</button>
                </div>
            </div>
        );
    }
}

const headerStyle = {
    position: 'absolute',
    left: '280px',
    color: 'white'
};

const sideBarStyle = {
    position: 'absolute',
    background: '#344955',
    height: '1000px',
    width: '650px',
    left: '1000px',
    borderStyle: 'solid',
    borderWidth: '6px',
    zIndex: -1
};

export default connect(null, {showForm})(SideBarForm);