import React, { Component } from 'react';
import logo from '../img/logo.png';
import './main.css';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarVisibility: false
        }
        this.startUpload = this.startUpload.bind(this);
        this.showFlightSummary = this.showFlightSummary.bind(this);
    }

    showMenu(){
        document.getElementById('menuIcon').classList.toggle("change");
    }
    startUpload(){
        this.props.view('upload');
    }
    showFlightSummary(){
        this.props.view('summary');
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
                <div className={"date"}>4 November, 2018 Sunday</div>
                <div className={"upcoming-flights"} onClick={this.showFlightSummary}>
                    <h4>Upcoming Flights</h4>
                    <div className={"uc-flight"}>
                        <h3>HKG - SEA</h3>
                        <h6>6 Nov - 18 Nov</h6>
                    </div>
                </div>
                <div className={"btn-wrapper"}>
                    <button onClick={this.startUpload}>
                        <i className="fas fa-plane-departure"></i>  Online Check-in
                    </button>
                </div>
                <div className={"past-flights"}>
                    <h4>Past Flights</h4>
                    <div className={"p-flight"} id={"p-one"}>
                        <h3>HKG - JNB</h3>
                    </div>
                    <div className={"p-flight"} id={"p-two"}>
                        <h3>HKG - SVO</h3>
                    </div>
                    <div className={"p-flight"} id={"p-three"}>
                        <h3>HKG - SIN</h3>
                    </div>
                    <div className={"p-flight"} id={"p-one"}>
                        <h3>HKG - JNB</h3>
                    </div>
                    <div className={"p-flight"} id={"p-two"}>
                        <h3>HKG - SVO</h3>
                    </div>
                    <div className={"p-flight"} id={"p-three"}>
                        <h3>HKG - SIN</h3>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
