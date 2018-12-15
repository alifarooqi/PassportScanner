import React, { Component } from 'react';
import './scanResult.css';

class ScanResult extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.scan || {
            scan: {
                givenName: "Tai Man",
                surName: "Chan",
                passportNo: "KO1234567",
                nationality: "CHN",
                dob: "01/10/1980",
                expiry: "05/04/2020",
                sex: "M"
            }
        }
        this.showSucccess = this.showSucccess.bind(this);
    }

    showSucccess(){
        this.props.view('success');
    }


    showMenu(){
        document.getElementById('menuIcon').classList.toggle("change");
    }

    render() {
        return (
            <div className="scanResult">
                <div className={"topNav"}>
                    <h1>Confirmation</h1>
                    <div className="menu-icon-container" onClick={this.showMenu} id={"menuIcon"}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>
                </div>

                <div className={"text_title"}>
                    <h3 className={"scanned-info-title"}> Scanned information </h3>

                    <h6 className={"scanned-info-subtitle"}>Please confirm or edit the beloew information </h6>
                </div>

                <div className={"summary-table-wrapper"}>
                    <div className="flex-row">
                        <div className={"field-title"}>Given Name</div>
                        <div>{this.state.scan.givenName}</div>
                    </div>
                    <div className="flex-row">
                        <div className={"field-title"}>Surname</div>
                        <div>{this.state.scan.surName}</div>
                    </div>
                    <div className="flex-row">
                        <div className={"field-title"}>Sex</div>
                        <div>{this.state.scan.sex}</div>
                    </div>
                    <div className="flex-row">
                        <div className={"field-title"}>Passport No</div>
                        <div>{this.state.scan.passportNo}</div>
                    </div>
                    <div className="flex-row">
                        <div className={"field-title"}>Nationality</div>
                        <div>{this.state.scan.nationality}</div>
                    </div>
                    <div className="flex-row">
                        <div className={"field-title"}>D.O.B (DD/MM/YYYY)</div>
                        <div>{this.state.scan.dob}</div>
                    </div>
                    <div className="flex-row">
                        <div className={"field-title"}>Passport Expiry</div>
                        <div>{this.state.scan.expiry}</div>
                    </div>
                    <button id={'cnfrm-btn'} onClick={this.showSucccess}>Confirm</button>
                    <button id={'edit-btn'}>Edit</button>
                </div>

            </div>
        );
    }
}

export default ScanResult;
