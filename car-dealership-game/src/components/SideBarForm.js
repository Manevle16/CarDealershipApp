import React, {Component} from 'react';
import styles from '../App.module.css';
import {connect} from "react-redux";
import {showForm} from "../actions/popUpActions";
import {save, addMoney} from "../actions/profileActions";

class SideBarForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            buttonVisibility: 'hidden'
        };
        this.displaySignUp = this.displaySignUp.bind(this);
        this.displayLogin = this.displayLogin.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
        this.addMoney = this.addMoney.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    addMoney = () => {
        this.props.addMoney();
    };

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

    saveProfile = () => {
        this.props.save();
    };

    render() {
        return (

            <div className={styles.panel} style={{height: '85px', top: '65px'}}>
                <h2 className={styles.panelHeader}>Profile</h2>
                <button onClick={this.displaySignUp} className={styles.buttonClass} style={{top: '40px', left: '6px'}}>Sign Up</button>
                <button onClick={this.displayLogin} className={styles.buttonClass} style={{top: '40px', left: '120px'}}>Login</button>
                <button onClick={this.saveProfile} className={styles.buttonClass}
                        style={{top:'40px', left: '215px', visibility: this.state.buttonVisibility}}>Save</button>
                <button onClick={this.addMoney} className={styles.buttonClass} style={{top: '40px', left: '300px'}}>Add</button>
            </div>

        );
    }
}





const mapStateToProps = (state) => {
    return state.sideBar;
};

export default connect(mapStateToProps, {showForm, save, addMoney})(SideBarForm);