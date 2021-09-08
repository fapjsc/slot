import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>DLS</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/egm" className="me-3">
                <Nav.Link>
                  <i className="fas fa-home" style={iconSize}></i>
                  <span className="ms-2">首頁</span>
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/accounting" className="me-3">
                <Nav.Link>
                  <i className="fas fa-file-alt" style={iconSize}></i>
                  <span className="ms-2">報表</span>
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/test" className="me-3">
                <Nav.Link>
                  <i className="fas fa-user" style={iconSize}></i>
                  <span className="ms-2">test123</span>
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/pizza">
                <Nav.Link>
                  <i className="fas fa-sign-out-alt" style={iconSize}></i>
                  <span className="ms-2">登出</span>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

const iconSize = {
  width: '16px',
  height: '16px',
};

export default Header;
