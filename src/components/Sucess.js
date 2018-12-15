import React, { Component } from 'react';
import icon from '../img/icon.png';
import './sucess.css';

class Sucess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarVisibility: false
        }
        this.goBackMain = this.goBackMain.bind(this);
        this.addAnother = this.addAnother.bind(this);
    }

    showMenu(){
        document.getElementById('menuIcon').classList.toggle("change");
    }
    goBackMain(){
        this.props.view('main');
    }
    addAnother(){
        this.props.view('upload');
    }

    render() {
        let sidebar;
        return (
            <div className="main">
                <div className={"topNav"}>
                    <h1>Welcome LaTeK</h1>
                    <div className="menu-icon-container" onClick={this.showMenu} id={"menuIcon"}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>
                </div>

                <img src={icon} className="icon" alt="Cathay Pacific"/>

                <div className={"text_title"}>
                      <h3 className="success-title">Check-in Success!</h3>

                      <h5 className="success-subtitle">Your boarding pass has been emailed to you!</h5>
                </div>

                <div className={"btn-wrapper"}>
                    <button onClick={this.addAnother}>
                        <i className="fas fa-plane-departure"></i>  Add other documents
                    </button>
                </div>


                <div className={"btn-wrapper"}>
                    <button onClick={this.goBackMain}>
                        Back to dashboard <i className="fas fa-plane-arrival"></i>
                    </button>
                </div>


            </div>
        );
    }
}

export default Sucess;
