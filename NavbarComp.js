import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export default class NavbarComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      name: ''
    };
  }

  componentDidMount() {
    const customerId = localStorage.getItem('customer_id');
    const name = localStorage.getItem('name');
    if (customerId && name) {
      this.setState({
        isLoggedIn: true,
        name: name
      });
    }
  }

  handleLogout = () => {
    localStorage.removeItem('customer_id');
    localStorage.removeItem('name');
    this.setState({
      isLoggedIn: false,
      name: ''
    });
  };

  render() {
    const { isLoggedIn, name } = this.state;

    return (
      <div>
        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href="#" style={{ marginRight: '200px' }}>Shopper</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link href="/" style={{ marginRight: '20px' }}>Home</Nav.Link>
              <Nav.Link href="/about" style={{ marginRight: '200px' }}>About</Nav.Link>
              <Nav.Link href="/category/clothes" style={{ marginRight: '10px' }}>
                Clothes
              </Nav.Link>
              <Nav.Link href="/category/accessories" style={{ marginRight: '10px' }}>
                Accessories
              </Nav.Link>
              <Nav.Link href="/category/footwear">Footwear</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              {isLoggedIn ? (
                <>
                  <NavDropdown title={`Hi, ${name}`} id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={this.handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
