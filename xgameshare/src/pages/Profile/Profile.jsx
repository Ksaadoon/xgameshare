import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent';
import ProfileHeading from '../../components/Profile/ProfileHeading';
import ProfileMenu from '../../components/Profile/ProfileMenu';
import FavoriteGameGrid from '../../components/Profile/FavoriteGameGrid';
// import { HomePageContext } from '../../components/Context/HomePageContext';
import * as xgameshareService from './../../services/xgameshare/xgameshare-service';

const Profile = ({ setUser, user }) => {

    const navigate = useNavigate();
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavoriteGames = async () => {
            try {
                const favoriteGames = await xgameshareService.getFavorites();
                setGames(favoriteGames);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFavoriteGames();
    }, [user]);


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
                            <FavoriteGameGrid user={user} games={games} loading={loading} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}
export default Profile