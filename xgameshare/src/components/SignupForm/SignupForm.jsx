import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import NavbarComponent from '../NavBarComponent/NavBarComponent';
import { signUp } from '../../services/users/users-service'

export default function SignupForm() {

    //store the input data in an state object to be used as argument param later
    const [credentials, setCredentials] = useState({
        username: '',
        email: '',
        password: '',
        confirm: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Perform form submission or validation logic
            // using the values in the `credentials` state
            console.log(credentials);
            //TODO: check password matches confirm
            //check password follow policies
            const formData = { ...credentials };
            delete formData.confirm;
            //const user = await signUp(formData);
            //console.log(user);
        } catch {
            console.log("error");
        } finally {
            // Reset the form
            setCredentials({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        }
    };

    /**
     * The event target name is empty in React Bootstrap because the event target is not a DOM element. 
     * It is a React component. To get the event target name, you MUST use currentTarget property of the event object. 
     *  
     */
    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.currentTarget.name]: event.currentTarget.value });
    }

    return (
        <Container>
            <Row>
                <Col>
                    <NavbarComponent />
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
        </Container>
    );
}