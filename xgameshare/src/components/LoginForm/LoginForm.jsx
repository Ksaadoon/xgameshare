import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavbarComponent from '../NavBarComponent/NavBarComponent';
import './LoginForm.css';

export default function LoginForm() {
    return (
        <Container>
            <Row>
                <Col>
                   <NavbarComponent/>
                </Col>
            </Row>
            <div className='login-form'>
            <Row>
                <Col>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
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
            </div>
        </Container>
    );
};


