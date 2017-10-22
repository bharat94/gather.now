import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';
import FacebookProvider, { Login } from 'react-facebook';
import Map from './Map.js'


class App extends Component {

  render() {
    return (
      <div className="App">
      </div>
    );
  }
}


class FacebookLogin extends Component {
  handleResponse = (data) => {
    console.log(data);
  }
 
  handleError = (error) => {
    this.setState({ error });
  }
 
  render() {
    return (
      <FacebookProvider appId="180236225860850">
        <Login
          scope="email"
          onResponse={this.handleResponse}
          onError={this.handleError}
        >
          <button className="loginBtn loginBtn--facebook">Login via Facebook</button>
        </Login>
      </FacebookProvider>
    );
  }
}




export default App;
