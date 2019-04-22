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
      <DropdownMenu right>
        <DropdownItem href='/profile/edit'>Profile</DropdownItem>
        <DropdownItem onClick={this.handleLogout}>Logout</DropdownItem>
      </DropdownMenu>
    );

    const guestLinks = (
      <DropdownMenu right>
        <DropdownItem href='/login'>Login</DropdownItem>
        <DropdownItem href='/signup'>Registro</DropdownItem>
      </DropdownMenu>
    );

    return (
      <div>
        <Navbar color='light' light expand='md'>
          <NavbarBrand href='/'>Destetik</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink href='/services'>Serviços</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle
                  className='dropdown-menu-div'
                  tag='div'
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
