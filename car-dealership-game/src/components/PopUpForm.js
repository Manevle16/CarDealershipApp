import React, {Component} from 'react';
import {connect} from "react-redux";
import styles from '../App.module.css';
import {closeForm} from "../actions/popUpActions";
import {login} from "../actions/profileActions";

class PopUpForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            visibility: {
                popUpHidden: true,
                loginVisibility: 'none',
                signUpVisibility: 'none'
            },
            formInput: {
                username: '',
                password: ''
            }
        };

        this.onChange = this.onChange.bind(this);
        this.onClose = this.onClose.bind(this);
        this.createAccount = this.createAccount.bind(this);
        this.loginAccount = this.loginAccount.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.setState(nextProps.popUpState);
    }

    onChange = (e) => {
        let newFormInput = JSON.parse(JSON.stringify(this.state.formInput));
        newFormInput[e.target.name] = e.target.value;
        this.setState({formInput: newFormInput})
    };

    onClose = () => {
        this.props.closeForm({
            visibility: {
                popUpHidden: true,
                loginVisibility: 'none',
                signUpVisibility: 'none'
            },
            formInput: {
                username: '',
                password: ''
            }
        });
    };

    createAccount = () => {

    };

    loginAccount = (e) => {
        e.preventDefault();
        this.props.login(this.state.formInput);
    };

    render() {
        return (
            <div style={popUpStyle} hidden={this.state.visibility.popUpHidden}>
                <form id='loginForm' onSubmit={this.loginAccount} style={{position: 'relative', display: this.state.visibility.loginVisibility}}>
                    <h2 className={styles.popUpTitle}>Login Form</h2>
                    <button onClick={this.onClose} className={styles.xButton}>X</button>
                    <h3 className={styles.formTitle}>Username</h3>
                    <input className={styles.formInput} name='username' type='text' onChange={this.onChange} value={this.state.formInput.username}/>
                    <h3 className={styles.formTitle}>Password</h3>
                    <input className={styles.formInput} name='password' type='text' onChange={this.onChange} value={this.state.formInput.password}/>
                    <button type='submit' className={styles.buttonClass} style={confirmButtonStyle}>Sign In</button>
                </form>
                <form id='signUpForm' onSubmit={this.createAccount} style={{position: 'relative', display: this.state.visibility.signUpVisibility}}>
                    <h2 className={styles.popUpTitle}>Sign Up Form</h2>
                    <button onClick={this.onClose} className={styles.xButton}>X</button>
                    <h3 className={styles.formTitle}>Username</h3>
                    <input className={styles.formInput} name='username' type='text' onChange={this.onChange} value={this.state.formInput.username}/>
                    <h3 className={styles.formTitle}>Password</h3>
                    <input className={styles.formInput} name='password' type='text' onChange={this.onChange} value={this.state.formInput.password}/>
                    <button type='submit' className={styles.buttonClass} style={confirmButtonStyle}>Create Account</button>
                </form>
            </div>
        );
    }
}

const popUpStyle = {
    position: 'absolute',
    background: '#F9AA33',
    height: '250px',
    width: '700px',
    zIndex: '3',
    left: '500px',
    top: '200px',
    borderWidth: '6px',
    borderStyle: 'solid'
};

const confirmButtonStyle = {
    background: '#fff',
    position: 'absolute',
    top: '150px',
    left: '50px'
};

const mapStateToProps = (state) => {
    return state;
};
export default connect(mapStateToProps, {closeForm, login},)(PopUpForm);