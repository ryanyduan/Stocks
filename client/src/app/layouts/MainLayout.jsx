import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "../services/auth";

class MainLayout extends Component {
    render() {
        if (!isAuth()) return <Redirect to='/' />;
        return (
            <Route
                render={(props) => {
                    return (
                        <div>
                            <Menu fixed='top' inverted>
                                <Menu.Item>Stocks</Menu.Item>
                            </Menu>
                            <this.props.component {...props} />
                        </div>
                    );
                }}
            />
        );
    }
}

export default MainLayout;
