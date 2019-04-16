import React, { Component } from "react";
import "./LoginModal.scss";
import { Redirect } from "react-router-dom";
import { Button, Form, Grid, Segment, Label } from "semantic-ui-react";
import { login } from "../../../services/api";

class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            msg: "",
            userError: false,
            passwordError: false,
            error: false
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ userError: false, passwordError: false });
        const { user, password } = e.target;
        let checkUser = false,
            checkPassword = false;

        if (!user.value || user.value.charAt(0) === " ") {
            checkUser = true;
            this.setState({ userError: true });
        }
        if (!password.value || password.value === "") {
            checkPassword = true;
            this.setState({ passwordError: true });
        }
        if (checkUser || checkPassword) return; // DeMorgan's !! I did it

        return login({
            user: user.value,
            password: password.value
        }).then((response) =>
            response.status === 200
                ? this.setState({ redirect: true })
                : this.handleError(response.data.errorType)
        );
    };

    handleError = (error) => {
        if (error === "DNE")
            this.setState({ error: true, msg: "User does not exist" });
        else if (error === "password")
            this.setState({ error: true, msg: "Wrong password" });
    };

    render() {
        const { redirect, error, userError, passwordError, msg } = this.state;
        if (redirect) return <Redirect to='/dashboard' />;
        return (
            <Grid columns={1} centered>
                <Grid.Row>
                    <Grid.Column className='centerText' width={12}>
                        <Segment>
                            <p className='title'>Login</p>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Field>
                                    <input
                                        name='user'
                                        placeholder='Username or email'
                                    />
                                    {userError && (
                                        <Label basic color='red' pointing>
                                            Please enter a username or email
                                        </Label>
                                    )}
                                </Form.Field>
                                <Form.Field>
                                    <input
                                        type='password'
                                        name='password'
                                        placeholder='Password'
                                    />
                                    {passwordError && (
                                        <Label basic color='red' pointing>
                                            Please enter your password
                                        </Label>
                                    )}
                                </Form.Field>
                                {error && (
                                    <Form.Field>
                                        <Label basic color='red'>
                                            {msg}
                                        </Label>
                                    </Form.Field>
                                )}
                                <Button primary type='submit'>
                                    Log in
                                </Button>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={12}>
                        <Segment className='register'>
                            Don't have an account?{" "}
                            <a href='/register' className='registerButton'>
                                Sign Up
                            </a>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default LoginModal;
