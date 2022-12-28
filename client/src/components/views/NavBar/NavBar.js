import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';

const NavBar = () => {
  const user = useSelector((state) => getUser(state));
  const [searchPhrase, setSearchPhrase] = useState('');
  const checkLogged = () => {
    console.log(user);
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Ads.app</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            {!user && (
              <Nav.Link as={NavLink} to="/login">
                Login
              </Nav.Link>
            )}
            {!user && (
              <Nav.Link as={NavLink} to="/register">
                Register
              </Nav.Link>
            )}
            {user && (
              <Nav.Link as={NavLink} to="/ad/add">
                New Ad
              </Nav.Link>
            )}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchPhrase}
              onChange={(event) => setSearchPhrase(event.target.value)}
            />
            <Button variant="outline-success" as={NavLink} to={'/search/' + searchPhrase}>
              Search
            </Button>
            <Button variant="outline-success" onClick={checkLogged}>
              Logged
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
