import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent';
import ProfileHeading from '../../components/Profile/ProfileHeading';
import ProfileMenu from '../../components/Profile/ProfileMenu';
import FavoriteGameGrid from '../../components/Profile/FavoriteGameGrid';
// import { HomePageContext } from '../../components/Context/HomePageContext';

const Profile = ({ setUser, user }) => {

    const navigate = useNavigate();
    const [selectedMenu, setSelectedMenu] = useState('Favorites');

    return (
        <>
            <div className='profile'>
                {/* <HomePageContext>
                {<NavBarComponent setUser={setUser} user={user}/>}
                </HomePageContext> */}
                <Container fluid>
                    <Row>
                        {/* d-none = display:none but it is not active if the size is greater than a device with d-mb-block */}
                        <Col md={3} className='d-none d-md-block'>
                            {/* (genre) => setSelectedGenre(genre): 
                    this is a anonymous function that takes a genre as parameter and calls the state method setSelectedGenre.
                It is a prop function!
              */}
                            <ProfileMenu setSelectedMenu={setSelectedMenu} selectedMenu={selectedMenu} />
                        </Col>
                        <Col md={9}>
                            <ProfileHeading selectedMenu={selectedMenu} />
                            <FavoriteGameGrid user={user} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}
export default Profile