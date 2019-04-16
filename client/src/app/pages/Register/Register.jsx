import React from "react";
import RegisterModal from "../../components/modals/Register/RegisterModal";
import "./Register.scss";
import { Container } from "semantic-ui-react";

const Register = () => {
    return (
        <Container className='container' fluid>
            <RegisterModal />
        </Container>
    );
};

export default Register;
