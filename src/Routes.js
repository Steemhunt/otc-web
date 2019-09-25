import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import asyncComponent from 'asyncComponent';

const Home = asyncComponent(() => import('pages/Home'));

class Routes extends Component {
  render() {
    return (
      <div id="content-body" className="content-body">
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Routes);
