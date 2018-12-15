import React, { Component } from 'react';
import logo from '../img/logo.png';
import './login.css';



class LogIn extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    login(){
        this.props.view('main');
    }

    render() {
        return (
            <div className="login">
                <div className="login-logo-wrapper">
                    <img src={logo} className="logo" alt="Cathay Pacific"/>
                </div>
                <div className={"login-wrapper"}>
                    <p>Marco Polo Club, Asia Miles or Registered account member</p>
                    <input className={"username"} placeholder={"Username"}/>
                    <input className={"password"} placeholder={"Password"} type={"password"}/>
                    <button className={"signin-btn"} onClick={this.login}>Sign in</button><br/>
                    <a href={"#"}>Register a new account</a><br/><br/>
                    <a href={"#"}>Forgot Password?</a>
                </div>
            </div>
        );
    }
}

export default LogIn;
