import React, { Component } from "react";
import Login from "../app/pages/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Login} />
                    {/* <Route exact path='/register' component={Register} /> */}
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
