import React, { Component } from "react";
import { Menu, Container } from "semantic-ui-react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "../services/auth";
import "./MainLayout.scss";

class MainLayout extends Component {
    render() {
        if (!isAuth()) return <Redirect to='/' />;
        return (
            <Route
                render={(props) => {
                    return (
                        <div>
                            <Menu inverted className='main-menu'>
                                <Menu.Item>Stocks</Menu.Item>
                            </Menu>
                            <Container fluid>
                                <this.props.component {...props} />
                            </Container>
                        </div>
                    );
                }}
            />
        );
    }
}

export default MainLayout;
