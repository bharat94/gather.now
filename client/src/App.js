import React, { Component } from 'react';
import FacebookProvider, { Login } from 'react-facebook';
import logo from './logo.svg';
import './App.css';
import graph from 'fb-react-sdk';

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

class FriendListItem extends Component {
  render() {
    return <li>{this.props.value}</li>;
  }
}

class FriendList extends Component {
  render() {
    const numbers = this.props.numbers;
    const friends = numbers.map((friend) =>
      <FriendListItem key={friend.toString()}
                      value={friend} />
    );
    return (
    <ul className="Friend-List">
      {friends}
    </ul>
    );
  }
}

const friends = [1,2,3,4,5]
class App extends Component {
  render() {
    return (
      <FacebookContent />
    );
  }
}

class FacebookContent extends Component {
  constructor(props) {
    super(props);
    this.updateProfile = this.updateProfile.bind(this);
    this.state = {
      profile: '',
      friends: []
    };
    this.data = '';
  }

  componentDidMount() {
    this.timerID = setInterval(
    () => this.update(), 2000);
  }

  update() {
    this.setState({
      profile: this.data.profile,
      friends: this.data.friends
    });
  }

  updateProfile(data) {
    this.data = data;
  }

  render() {
    let display = null;
    if (typeof this.state.profile == "undefined") {
      display = (
        <Facebook className="loginBtn loginBtn--facebook" updateProfile={this.updateProfile} />
      );
    } else {
      display = (
        <div className="row welcome-user">
          <h3>Welcome {this.state.profile.name}!</h3>
        </div>
      );
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">gather.now</h1>
        </header>
        {display}
      </div>
    );
  }
}

class Facebook extends Component {

  handleResponse = (data) => {
    var profile = data.profile;
    graph.setAccessToken(data.tokenDetail.accessToken);
    graph.get("https://graph.facebook.com/v2.10/me/taggable_friends", function(err, res) {
                                                          data.friends = res.data;      
                                                        });
    // fetch("http://localhost:3000/api/user", {
    //   method: "POST",
    //   headers:{
    //               'Accept': 'application/json',
    //               'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //               name: profile.name,
    //               email: profile.email,
    //             })
    //           })
    console.log(data)
    this.props.updateProfile(data);
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
