import React, { Component } from "react";
import "./RegisterModal.scss";
import { Redirect } from "react-router-dom";
import { Button, Form, Grid, Segment, Label } from "semantic-ui-react";
import { register } from "../../../services/api";

class RegisterModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            redirect: false,
            msg: "",
            emailError: false,
            usernameError: false,
            password1Error: false,
            password2Error: false,
            matchError: false,
            error: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({emailError: false, usernameError: false, password1Error: false, password2Error: false, matchError: false, error: false})
        const { email, username, password1, password2 } = e.target;
        let checkEmail = false, checkUsername = false, checkPW1 = false, checkPW2 = false, match = true;

        if (!email.value || email.value.charAt(0) === " "){
            checkEmail = true;
            this.setState({emailError: true});
        }
        if (!username.value || username.value === ""){
            checkUsername = true;
            this.setState({usernameError: true});
        }
        if (!password1.value || password1.value === ""){
            checkPW1 = true;
            this.setState({password1Error: true});
        }
        if (!password2.value || password2.value === ""){
            checkPW2 = true;
            this.setState({password2Error: true});
        }
        if (password1.value !== password2.value) {
            match = false;
            this.setState({matchError: true})
        }

        if (checkEmail || checkUsername || checkPW1 || checkPW2 || !match) return;
        
        register({email: email.value, username: username.value, password: password1.value}).then(response =>  response.status === 200
            ? this.setState({ redirect: true })
            : this.handleError(response.data.errorType))
    }

    handleError = (error) => {
        if(error === "usernameExists") {
            this.setState({error: true, msg : "Username already exists. Please choose another."})
        }
        else if (error === "emailExists"){
            this.setState({error: true, msg: "Email already exists."})
        }
    }

    render(){
        const { msg, emailError, usernameError, password1Error, password2Error, error, matchError, redirect } = this.state;
        if (redirect) return <Redirect to='/' />;
         return (
            <Grid columns={1} centered>
                <Grid.Row>
                    <Grid.Column className='centerText' width={12}>
                        <Segment>
                            <p className='title'>Sign Up</p>
                            <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                    <input
                                        name='email'
                                        placeholder='Email'
                                    />
                                    {emailError && (
                                        <Label basic color='red' pointing>
                                            Enter an email
                                        </Label>
                                    )}
                                </Form.Field>
                                <Form.Field>
                                    <input
                                        name='username'
                                        placeholder='Username'
                                    />
                                    {usernameError && (
                                        <Label basic color='red' pointing>
                                            Enter a username
                                        </Label>
                                    )}
                                </Form.Field>
                                <Form.Field>
                                    <input
                                        type='password'
                                        name='password1'
                                        placeholder='Password'
                                    />
                                    {password1Error && (
                                        <Label basic color='red' pointing>
                                            Please choose password
                                        </Label>
                                    )}
                                </Form.Field>
                                <Form.Field>
                                    <input
                                        type='password'
                                        name='password2'
                                        placeholder='Confirm your password'
                                    />
                                     {matchError && (
                                        <Label basic color='red' pointing>
                                            Passwords do not match
                                        </Label>
                                    )}
                                    {password2Error && (
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
                                    Sign Up
                                </Button>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={12}>
                        <Segment className='login'>
                            Already have an account?{" "}
                            <a href='/' className='loginButton'>
                                Login
                            </a>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default RegisterModal;