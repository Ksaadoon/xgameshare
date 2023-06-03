import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link , useNavigate } from 'react-router-dom';
import NavbarComponent from '../NavBarComponent/NavBarComponent';
import * as usersService from '../../services/users/users-service'
import './LoginForm.css';

export default function LoginForm({ setUser, user }) {

    // The useNavigate hook is used to access the navigate object, 
    // which provides methods for manipulating the navigation. 
    // The push method is used to navigate to a new URL

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    function handleChange(evt) {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
        setError('');
    }

    async function handleSubmit(evt) {
        // Prevent form from being submitted to the server
        evt.preventDefault();
        try {
            // The promise returned by the signUp service method 
            // will resolve to the user object included in the
            // payload of the JSON Web Token (JWT)
            const user = await usersService.login(credentials);
            setUser(user);
            navigate('/',{replace: true});

        } catch {
            setError('Log In Failed - Try Again');
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <NavbarComponent setUser={setUser} user={user} />
                </Col>
            </Row>
            <div className='login-form'>
                <Row>
                    <Col>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            <p>
                                <Form.Text className="text-muted">
                                    If you forgot your login information you can
                                </Form.Text>
                                <Link to="/reset-password"> reset your password</Link>
                            </p>
                        </Form>
                    </Col>
                </Row>
                <div>
                    <p className="error-message">{error}</p>
                </div>            
            </div >
        </Container >
    );
};


