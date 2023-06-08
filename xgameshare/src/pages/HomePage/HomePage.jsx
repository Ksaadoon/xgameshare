import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent';
import Games from '../../components/Games/Games';
import GameGenresList from '../../components/Games/GameGenresList';
import { useState } from 'react';
import PlatformSelector from '../../components/Selectors/PlatformSelector';

export default function HomePage({ setUser, user }) {

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleSelectGenre = (genre) => {
    console.log('Selected genre:', genre);
    setSelectedGenre(genre);
  };
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
            <PlatformSelector />
            <GameGenresList onSelectGenre={handleSelectGenre}  />
          </Col>
          <Col>
            <Games selectedGenre={selectedGenre}/>
          </Col>
        </Row>
      </Container>
    </>
  );
}
