import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Route } from "react-router-dom";

class MainLayout extends Component {
    render() {
        return (
            <Route
                render={(props) => {
                    return (
                        <div>
                            <Menu fixed='top' inverted>
                                <Menu.Item>Stocks</Menu.Item>
                            </Menu>
                            {/* <this.props.component {...props} /> */}
                        </div>
                    );
                }}
            />
        );
    }
}

export default MainLayout;
