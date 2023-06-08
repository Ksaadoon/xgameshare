import './NavBarComponent.css';
import { Navbar, Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { logOut } from '../../services/users/users-service';
import SearchComponent from '../SearchComponent/SearchComponent';

const NavbarComponent = ({ setUser, user, onSearch}) => {

  function handleLogOut() {
    // Remove the user token from local storage
    logOut();
    // Update user state in App
    setUser(null);
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">XGameShare</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Dashboard</Nav.Link>
        </Nav>
        <SearchComponent onSearch={onSearch}/>
        <Nav className="mr-auto">
          {/* when you have multiple elements in a conditional rendering, they need to be wrapped inside a single parent element. 
           thus wrapping the elements inside a <React.Fragment> (<>) or a <div> */}
          {user ?
            (
              <>
                <Nav.Link href="/invite">Invite</Nav.Link>
                <Nav.Link href="/" onClick={handleLogOut}>Log Out</Nav.Link>
              </>
            )
            : (
              <>
                <Nav.Link href="/login">Log In</Nav.Link>
                <Nav.Link href="/signup">Sign Up</Nav.Link>
              </>
            )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

NavbarComponent.propTypes = {
  onSearch: PropTypes.func,
};


export default NavbarComponent;
