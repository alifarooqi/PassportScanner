import React, { Component } from 'react';
import './App.css';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

import Welcome from './components/Welcome';
import LogIn from './components/LogIn';
import Main from './components/Main';
import Upload from './components/Upload';
import Summary from './components/Summary';
import ScanResult from './components/ScanResult';
import Sucess from './components/Sucess';
import '@fortawesome/fontawesome-free/css/all.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'welcome',
            scan: null
        }
        this.setScanResult = this.setScanResult.bind(this);
        this.view = this.view.bind(this);
        this.view('login')
    }

    view(comp){
        setTimeout(()=>{
            document.getElementsByClassName('App')[0].style.opacity = 0
        }, 500)
        setTimeout(()=>{
            this.setState({view: comp})
        }, 1000)
        setTimeout(()=>{
            document.getElementsByClassName('App')[0].style.opacity = 1
        }, 1050)
    }
    setScanResult(scan){
        this.setState({scan: scan});
    }
  render() {
        let currentView;
        if (this.state.view == 'welcome')
            currentView = <Welcome/>
        else if (this.state.view == 'login')
            currentView = <LogIn view={this.view}/>
        else if (this.state.view == 'main')
            currentView = <Main view={this.view}/>
        else if (this.state.view == 'upload')
            currentView = <Upload view={this.view} setScanResult={this.setScanResult}/>
        else if (this.state.view == 'summary')
            currentView = <Summary view={this.view} scan={this.state.scan}/>
        else if (this.state.view == 'scanResult')
            currentView = <ScanResult view={this.view}/>
        else if (this.state.view == 'success')
            currentView = <Sucess view={this.view}/>
    return (
      <div className="App">
          {currentView}
      </div>
    );
  }
}

export default App;
