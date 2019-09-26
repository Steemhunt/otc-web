import React, { Component, Suspense } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Footer from "components/Footer";
import CircularProgress from "components/CircularProgress";
import asyncComponent from "asyncComponent";

const Home = asyncComponent(() => import("pages/Home"));

class Routes extends Component {
  render() {
    return (
      <Suspense fallback={<CircularProgress />}>
        <div id="content-body" className="content-body">
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
          <Footer />
        </div>
      </Suspense>
    );
  }
}

export default withRouter(Routes);
