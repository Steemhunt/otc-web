import React, { Component } from 'react';

const AppContext = React.createContext();
const { Provider, Consumer } = AppContext;

class AppProvider extends Component {
  state = {
    language: "ko"
  };

  componentDidMount() {}

  updateState = (key, value) => {
    this.setState({ [key]: value });
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          updateState: this.updateState,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { AppProvider, Consumer as AppConsumer };

export default AppContext;
