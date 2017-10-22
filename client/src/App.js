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
    this.props.onButtonClick();
  }

  render() {
    return (
      <div className="row">
        <button type="button" className="btn btn-info btn-lg" onClick={this.handleClick}>
          Convene
        </button>
      </div>
    );
  }
}

class PartyPlan extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onButtonClick();
  }

  render() {
    return (
      <div className="row">
        <button type="button" className="btn btn-primary btn-lg" onClick={this.handleClick} >
          Party
        </button>
      </div>
    );
  }
}

class EventPlanner extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onButtonClick();
  }

  render() {
    let answer = (
      <div className="container-fluid">
        <ConvenePlan onButtonClick={this.handleClick} />
        <PartyPlan onButtonClick={this.handleClick} />
      </div>
    );
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
    return (
      <li>
        <div className="row friend-item">
          <img src={this.props.value.picture.data.url} height="90px" width="90px" />
          <h4 className="friend-name">{this.props.value.name}</h4>
        </div>
      </li>
    );
  }
}

class Invitation extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.sendInvitations();
  }

  render() {
    return (
      <div className="row">
        <button type="button" className="btn btn-success btn-lg" onClick={this.handleClick} >
          Send Invitations
        </button>
      </div>
    );
  }
}

class FriendList extends Component {
  constructor(props) {
    super(props);
    this.sendInvitations = this.sendInvitations.bind(this);
  }

  sendInvitations() {
    this.props.sendInvitations();
  }

  render() {
    const friends = this.props.friends;
    let filtered = friends.slice(0, 4);
    const friendList = filtered.map((friend) =>
      <FriendListItem key={friend.id.toString()}
                      value={friend} />
    );
    return (
    <div className="container-fluid">
      <ul className="Friend-List">
        {friendList}
      </ul>
      <Invitation sendInvitations={this.sendInvitations} />
    </div>
    );
  }
}

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
    this.handleClick = this.handleClick.bind(this);
    this.sendInvitations = this.sendInvitations.bind(this);
    this.state = {
      profile: '',
      friends: [],
      isOptionSelected: false,
      invited: false
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

  handleClick() {
    this.setState({
      isOptionSelected: true
    });
  }

  sendInvitations() {
    this.setState({
      invited: true
    });
  }

  render() {
    let display = null;
    if (this.state.invited) {
      display = (
        <div className="container-fluid">
          <h4 className="invite-title">All your friends are on the way! ETAs will be updated soon.</h4>
          <FriendList friends={this.state.friends} />
        </div>
      );
    } else if (this.state.isOptionSelected) {
      display = (
        <FriendList friends={this.state.friends} sendInvitations={this.sendInvitations} />
      );
    } else if (typeof this.state.profile == "undefined") {
      display = (
        <Facebook className="loginBtn loginBtn--facebook" updateProfile={this.updateProfile} />
      );
    } else {
      display = (
        <div className="row welcome-user">
          <h3>Welcome {this.state.profile.name}!</h3>
          <EventPlanner onButtonClick={this.handleClick} />
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
