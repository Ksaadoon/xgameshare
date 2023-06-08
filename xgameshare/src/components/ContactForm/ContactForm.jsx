
import React, { useRef, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import NavbarComponent from '../NavBarComponent/NavBarComponent';
import emailjs from '@emailjs/browser';

const ContactForm = ({ setUser, user }) => {

  const form = useRef();
  const [error, setError] = useState('');

  const sendEmail = async (e) => {
    e.preventDefault(); // prevents the page from reloading when you hit “Send”

    emailjs.sendForm(
      process.env.REACT_APP_EMAIL_JS_SERVICE_ID,
      process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID, 
      form.current,
      process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY)
      .then((result) => {
        setError("Email was successfully sent. ");
      }, (error) => {
        setError(error);
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <NavbarComponent setUser={setUser} user={user} />
        </Col>
      </Row>
      <div className='invite-form'>
        <Row>
          <Col>
            <Form ref={form} onSubmit={sendEmail}>
              <Form.Group className="mb-3" controlId="to_name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="to_name" placeholder="Enter first name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="user_email">
                <Form.Label>Email address</Form.Label>
                <Form.Control required type="email" name="user_email" placeholder="Enter recipient email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="optional_message">
                <Form.Label>Message (optional)</Form.Label>
                <Form.Control type="text-area" name="optional_message" placeholder="optional message" />
              </Form.Group>
              

              <Button variant="primary" type="submit">Send Invite</Button>
            </Form>
          </Col>
        </Row>
        <div>
          <p className="error-message">{error}</p>
        </div>
      </div>
    </Container>
  );
};

export default ContactForm;

