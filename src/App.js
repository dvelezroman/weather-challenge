import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

// COMPONENTS
import {Forecast} from './containers/forecast';

class App extends Component {
  render() {
    return (
        <Router>
            <Route exact path="/" component={Forecast} />
        </Router>
    );
  }
}

export default App;
