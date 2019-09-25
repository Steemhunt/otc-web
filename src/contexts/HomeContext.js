import React, { Component } from "react";
import api from "utils/api";
import { handleErrorMessage } from "utils/errorMessage";

const HomeContext = React.createContext();
const { Provider, Consumer } = HomeContext;

class HomeProvider extends Component {
  state = {
    loading: false,
    offers: []
  };

  componentDidMount() {}

  updateState = (key, value) => {
    this.setState({ [key]: value });
  };

  fetchOffers = () => {
    this.setState({ loading: true });
    api
      .get("/offers.json")
      .then(offers => this.setState({ offers }))
      .catch(handleErrorMessage)
      .then(() => this.setState({ loading: false }));
  };

  postOffer = async (escrow_url, cb) => {
    this.setState({ loading: true });
    api
      .post("/offers.json", { offer: { escrow_url } })
      .then(() => {
        cb && cb();
      })
      .catch(handleErrorMessage)
      .then(() => this.fetchOffers());
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          updateState: this.updateState,
          fetchOffers: this.fetchOffers,
          postOffer: this.postOffer
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { HomeProvider, Consumer as AppConsumer };

export default HomeContext;
