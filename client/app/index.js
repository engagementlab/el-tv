import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import App from './components/App/App';
import Admin from './components/Admin/Admin';
import './styles/styles.scss';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/admin" component={Admin} />
    </div>
  </Router>, document.getElementById('root')
);