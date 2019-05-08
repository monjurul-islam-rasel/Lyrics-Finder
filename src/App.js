import React, { Component } from "react";
import { Provider } from "./context";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/layout/NavBar";
import Index from "./components/layout/Index";
import Leyrics from "./components/tracks/Leyrics";
import "emoji-mart/css/emoji-mart.css";

class App extends Component {
 
  render() {

    return (
      <Provider>
        <Router>
          <React.Fragment>
            <NavBar />
            <div className="container"> 
              <Switch>
                <Route exact path="/" component={Index} />
                <Route exact path="/lyrics/track/:id" component={Leyrics} />
              </Switch>
            </div>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;