import React, { Component } from "react";
import Login from "../app/pages/Login/Login";
import Register from "../app/pages/Register/Register";
import MainLayout from "../app//layouts/MainLayout";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import StocksTable from "./components/Table/Table";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <MainLayout exact path='/dashboard' component={StocksTable} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
