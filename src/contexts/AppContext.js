import React, { Component } from 'react';
import api from 'utils/api';

const AppContext = React.createContext();
const { Provider, Consumer } = AppContext;

class AppProvider extends Component {
  state = {};

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
