import React, { Component } from 'react';
import './summary.css';
import card from "../img/summary_card.png";
import document from "../img/document_card.png";



class Summary extends Component {
    constructor(props) {
        super(props);
        this.startUploading = this.startUploading.bind(this);
    }

    startUploading(){
        this.props.view('upload');
    }


    showMenu(){
        document.getElementById('menuIcon').classList.toggle("change");
    }

    render() {
        return (
            <div className="summary">
                <div className={"topNav"}>
                    <h1>Flight Summary</h1>
                    <div className="menu-icon-container" onClick={this.showMenu} id={"menuIcon"}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>
                </div>
                <div>
                    <img src={card} className="card3" alt="Card View Summary"/>
                    <img src={document} className="document" alt="Cathay Pacific"/>
                    <button className={"addDoc-btn"} onClick={this.startUploading}><i className="fas fa-plane-departure"></i> Online Check-in</button>
                </div>
            </div>
        );
    }
}

export default Summary;
