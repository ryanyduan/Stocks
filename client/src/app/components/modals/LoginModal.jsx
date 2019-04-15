import React, { useState, Component } from "react";
import "./LoginModal.scss";
import { Redirect } from 'react-router-dom';
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { login } from "../../services/api";

class LoginModal extends Component {
    // const [error, setError] = useState(null);

    constructor(props){
        super(props);
        this.state = {redirect: false};
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { user, password } = e.target;
        const response = login({
            user: user.value,
            password: password.value
        })
            .then((response) => (response.data.authenticated === true) ? this.setState({redirect: true}) : null )
            .catch((error) => console.log(error));
    }

    render(){
        const {redirect} = this.state;
        if (redirect) return <Redirect to='/dashboard' />
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
    }
};

export default LoginModal;
