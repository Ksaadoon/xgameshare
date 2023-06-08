import './NavBarComponent.css';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { logOut } from '../../services/users/users-service';
import SearchComponent from '../SearchComponent/SearchComponent';

const NavbarComponent = ({setUser, user}) => {
    
    
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
        <SearchComponent/>
        <Nav className="mr-auto">
          {/* when you have multiple elements in a conditional rendering, they need to be wrapped inside a single parent element. 
           thus wrapping the elements inside a <React.Fragment> (<>) or a <div> */}
          { user ? 
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
            ) }          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
