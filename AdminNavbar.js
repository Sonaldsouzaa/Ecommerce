import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export default class AdminNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      admin_name: ''
    };
  }

  componentDidMount() {
    const admin_id = localStorage.getItem('admin_id');
    const admin_name = localStorage.getItem('admin_name');
    if (admin_id && admin_name) {
      this.setState({
        isLoggedIn: true,
        admin_name: admin_name
      });
    }
  }

  handleLogout = () => {
    localStorage.removeItem('admin_id');
    localStorage.removeItem('admin_name');
    this.setState({
      isLoggedIn: false,
      admin_name: ''
    });
  };

  render() {
    const { isLoggedIn, admin_name } = this.state;

    return (
      <div>
        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href="#" style={{ marginRight: '200px' }}>Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link href="addProduct" style={{ marginRight: '200px' }}>Add Product</Nav.Link>
              <Nav.Link href="/adminproduct" style={{ marginRight: '200px' }}>View Products</Nav.Link>
            </Nav>
            {/* <Nav className="ml-auto">
              {isLoggedIn ? (
                <>
                  <NavDropdown title={`Hi, ${admin_name}`} id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={this.handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link href="/adminlogin">Login</Nav.Link>
                </>
              )}
            </Nav> */}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}