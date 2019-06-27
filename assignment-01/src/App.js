import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

class App extends Component {

  state = {
    username: { name: 'Muj' }
  }

  manipulateStateHandler = (event) => {
    this.setState({
      username: { name: event.target.value }
    })
  }

  render() {

    const inputStyle = {
      padding: "1rem 1.5rem",
      "font-size": "1.2rem",
      "border-radius": "50px",
      border: "none",
      "background-color": "#DBE4EE",
      color: "white",
      outline: "none"
    };

    return (
      <div className="App">
        <UserInput
          style={inputStyle}
          change={this.manipulateStateHandler}
          name={this.state.username.name}
        />
        <div className="OutputContainer">
          <UserOutput name={this.state.username.name} />
          <UserOutput name={this.state.username.name} />
          <UserOutput name={this.state.username.name} />
          <UserOutput name={this.state.username.name} />
        </div>
      </div>
    );
  }
}

export default App;
