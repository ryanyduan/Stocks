import React, { Component } from "react";
import { Menu, Container } from "semantic-ui-react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "../services/auth";
import { logout } from "../services/api";
import "./MainLayout.scss";

class MainLayout extends Component {
    state = { redirect: false };

    handleLogout = async (e) => {
        e.preventDefault();
        await logout().then((response) => (response.status === 200 ? this.removeToken() : null));
    };

    removeToken = () => {
        localStorage.removeItem("token");
        this.setState({ redirect: true });
    };

    render() {
        const { redirect } = this.state;
        if (!isAuth() || redirect) return <Redirect to='/' />;
        return (
            <Route
                render={(props) => {
                    return (
                        <div>
                            <Menu inverted className='main-menu'>
                                <Menu.Item>Stocks</Menu.Item>
                                <Menu.Menu position='right'>
                                    <Menu.Item position='right' name='Log Out' onClick={this.handleLogout} />
                                </Menu.Menu>
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
