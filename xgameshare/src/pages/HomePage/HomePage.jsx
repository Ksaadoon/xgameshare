import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent';


export default function HomePage({setUser, user}) {
    return (
        <>
        <Container>
          <Row>
            <Col>
              <NavBarComponent setUser={setUser} user={user} />
            </Col>
          </Row>
          <Row>
            <Col>          
              <h1>Main Content</h1>
            </Col>
          </Row>
        </Container>
        </>
      );
}
