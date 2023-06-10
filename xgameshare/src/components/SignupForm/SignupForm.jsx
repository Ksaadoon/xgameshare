import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../NavBarComponent/NavBarComponent';
import { signUp } from '../../services/users/users-service'

export default function SignupForm({ setUser, user }) {

    const navigate = useNavigate();

    //store the input data in an state object to be used as argument param later
    const [credentials, setCredentials] = useState({
        username: '',
        email: '',
        password: '',
        confirm: ''
    });
    const [errorMessage, setErrorMessage] = useState({ message: '', details: '' });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Perform form submission or validation logic using the values in the `credentials` state
            console.log("credentials: " + JSON.stringify(credentials));
            //always make a copy with spread operator      
            const formData = { ...credentials };

            //check password matches confirm
            if (formData.password !== formData.confirm) {
                throw new Error("Passwords do not match. Please try again");
            }
            //check password follow policies (optional)

            delete formData.confirm;
            const user = await signUp(formData);
            setUser(user);
            navigate('/', { replace: true });

        } catch (error) {
            //setErrorMessage( {message: "bad stuff happened", details: "details of bad stuff"});
            setErrorMessage({ message: error.error, details: error.details });
        }
    };

    /**
     * The event target name is empty in React Bootstrap because the event target is not a DOM element. 
     * It is a React component. To get the event target name, you MUST use currentTarget property of the event object. 
     *  
     */
    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.currentTarget.name]: event.currentTarget.value });
        setErrorMessage('');
    }


    /**
     * In React, a controlled component is one where the value of the input is controlled by React state, 
     * while an uncontrolled component allows the input value to be managed by the DOM.
     * To do a controlled component the 'value' field should be set by the react state props.
     */
    return (
        <Container>
            <Row>
                <Col>
                    <NavbarComponent setUser={setUser} user={user} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control required type="text" placeholder="Select a username" name="username" value={credentials.username} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required type="email" placeholder="Enter email" name="email" value={credentials.email} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" placeholder="Password" name="password" value={credentials.password} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formConfirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control required type="password" placeholder="Re-enter Password" name="confirm" value={credentials.confirm} onChange={handleChange} />
                        </Form.Group>
                        <Form.Text className="text-muted">
                            <p>Password must be...</p>
                        </Form.Text>


                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
            {/* Only show error message if there is one 
             the && is like a then (if...then)
            */}
            {errorMessage.message && (
                <p className="error-message">
                    {errorMessage.message} {errorMessage.details}
                </p>
            )}
        </Container>
    );
}