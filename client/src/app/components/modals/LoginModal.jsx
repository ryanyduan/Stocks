import React, { Fragment } from "react";
import "./LoginModal.scss";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { login } from "../../services/api";

const LoginModal = (props) => {
    return (
        <Grid columns={1} centered>
            <Grid.Row>
                <Grid.Column className='centerText' width={12}>
                    <Segment>
                        <p className='title'>Login</p>
                        <Form onSubmit={handleSubmit}>
                            <Form.Field>
                                <input
                                    name='user'
                                    placeholder='Username or email'
                                />
                            </Form.Field>
                            <Form.Field>
                                <input
                                    type='password'
                                    name='password'
                                    placeholder='Password'
                                />
                            </Form.Field>
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
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const { user, password } = e.target;
    await login({ user: user.value, password: password.value });
};

export default LoginModal;
