import React, { Component } from 'react';
import FacebookProvider, { Login } from 'react-facebook';
import logo from './logo.svg';
import './App.css';

class ConvenePlan extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onButtonClick('Hello World');
  }

  render() {
    return (
      <div className="row">
        <button type="button" className="btn btn-info btn-lg" onClick={this.handleClick}>
          {this.props.data}
        </button>
      </div>
    );
  }
}

class EventPlanner extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {data: '', option: 'Convene'};
  }

  handleClick(value) {
    this.setState({data: value});
    console.log(value);
  }

  render() {
    let answer = null;
    if (this.state.data === '') {
      answer = (
        <div className="container-fluid">
          <ConvenePlan data={this.state.option} onButtonClick={this.handleClick} />
          <div className="row">
            <button type="button" className="btn btn-primary btn-lg">Party</button>
          </div>
        </div>
      );
    } else {
      answer = <h3>Hello World</h3>;
    }
    return (
      <div className="container">
        <div className="row">
          <h1 className="App-title">Pick your poison!</h1>
        </div>
        {answer}
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to gather.now</h1>
        </header>
        <EventPlanner />
        <Facebook className="loginBtn loginBtn--facebook"> </Facebook>
      </div>
    );
  }
}

class Facebook extends Component {
  handleResponse = (data) => {
    console.log(data.profile);
  }
 
  handleError = (error) => {
    this.setState({ error });
  }
 
  render() {
    return (

      <FacebookProvider appId="180236225860850">
        <Login
            scope="email, public_profile"
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
