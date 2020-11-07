import React from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      displayError: false,
    };
  }
  incrementCounter = () => {
    this.state.displayError
      ? this.setState((prevState) => ({
          counter: prevState.counter + 1,
          displayError: !prevState.displayError,
        }))
      : this.setState((prevState) => ({ counter: prevState.counter + 1 }));
  };
  decrementCounter = () => {
    if (this.state.counter === 0) {
      this.setState((prevState) => ({ displayError: true }));
    } else {
      this.setState((prevState) => ({ counter: prevState.counter - 1 }));
    }
  };
  render() {
    const hidden = this.state.displayError ? "" : "-hidden";
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">
          The counter is currently: {this.state.counter}
        </h1>
        {this.state.displayError ? (
          <h2 data-test={`error-message${hidden}`}>
            The counter should not have value bellow 0
          </h2>
        ) : null}

        <button onClick={this.decrementCounter} data-test="decrement-button">
          Decrement Counter
        </button>
        <button onClick={this.incrementCounter} data-test="increment-button">
          Increment Counter
        </button>
      </div>
    );
  }
}

export default App;
