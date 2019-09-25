import React, { Component } from "react";
import api from "utils/api";
import { notification } from "antd";
import { handleErrorMessage } from "utils/errorMessage";

const HomeContext = React.createContext();
const { Provider, Consumer } = HomeContext;

class HomeProvider extends Component {
  state = {
    loading: false,
    tokenInformation: null,
    offers: [],
    query: ""
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.fetchOffers(false);
    }, 1000 * 30);
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }

  updateState = state => {
    this.setState(state);
  };

  fetchOffers = (showLoading = true) => {
    showLoading && this.setState({ loading: true });
    api
      .get("/offers.json")
      .then(offers => {
        this.setState({ offers });
      })
      .catch(handleErrorMessage)
      .then(() => this.setState({ loading: false }));
  };

  postOffer = async (escrow_url, cb) => {
    this.setState({ loading: true });
    api
      .post("/offers.json", { offer: { escrow_url } })
      .then(() => {
        notification["success"]({ message: "등록 되었습니다" });
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
