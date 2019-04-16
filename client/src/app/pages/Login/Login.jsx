import React from "react";
import LoginModal from "../../components/modals/Login/LoginModal";
import "./Login.scss";
import { Container } from "semantic-ui-react";

const Login = () => {
    return (
        <Container className='container' fluid>
            <LoginModal />
        </Container>
    );
};

export default Login;
