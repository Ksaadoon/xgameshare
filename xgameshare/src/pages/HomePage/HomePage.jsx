import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent';
import Games from '../../components/Games/Games';


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
              <Games/>
            </Col>
          </Row>
        </Container>
        </>
      );
}
