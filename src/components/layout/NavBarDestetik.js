import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class NavBarDestetik extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogout = () => {
    this.props.logoutUser();
    window.location.href = '/login';
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <DropdownMenu
        right
        style={{ background: 'rgba(252, 198, 255)', borderTop: '0px' }}
      >
        <DropdownItem href="/edit/dados-pessoais">Profile</DropdownItem>
        <DropdownItem onClick={this.handleLogout}>Logout</DropdownItem>
      </DropdownMenu>
    );

    const guestLinks = (
      <DropdownMenu
        right
        style={{ background: 'rgba(252, 198, 255)', borderTop: '0px' }}
      >
        <DropdownItem href="/login">Login</DropdownItem>
        <DropdownItem href="/signup">Registro</DropdownItem>
      </DropdownMenu>
    );

    const logoStyle = {
      color: 'rgba(0, 0, 0, 0.8)',
      fontSize: `${1.5}rem`
    };

    return (
      <div>
        <Navbar
          light
          expand="md"
          style={{ backgroundColor: 'rgba(252, 198, 255)' }}
          className="navbar-destetik"
        >
          <NavbarBrand href="/" className="logo" style={logoStyle}>
            Destetik
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/services">Serviços</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle
                  className="dropdown-menu-div"
                  tag="div"
                  nav
                  caret
                >
                  {user.name ? `Olá ${user.name}` : 'Login'}
                  {isAuthenticated ? authLinks : guestLinks}
                </DropdownToggle>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

NavBarDestetik.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(NavBarDestetik);
