import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent';

export default function HomePage() {
    return (
        <>
        <Container>
          <Row>
            <Col>
              <NavBarComponent/>
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
