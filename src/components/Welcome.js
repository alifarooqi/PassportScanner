import React, { Component } from 'react';
import logo from '../img/logo.png';
import './welcome.css';
import { css } from 'react-emotion';
import { RingLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;



class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    render() {
        return (
            <div className="welcome">
                <div>
                    <img src={logo} className="logo" alt="Cathay Pacific"/>
                    <h2 className="welcome-title">CX Fill and Fly</h2>
                    <h5 className="welcome-subtitle">All travel documents in one app</h5>
                    <RingLoader
                        className={override}
                        sizeUnit={"px"}
                        size={50}
                        color={'#ffffff'}
                        loading={this.state.loading}
                    />
                </div>
            </div>
        );
    }
}

export default Welcome;
