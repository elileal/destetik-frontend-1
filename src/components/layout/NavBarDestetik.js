import React from 'react';
import { Link } from 'react-router-dom';
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
        <Link to='/profile/edit'>
          <DropdownItem>Profile</DropdownItem>
        </Link>
        <DropdownItem onClick={this.handleLogout}>Logout</DropdownItem>
      </DropdownMenu>
    );

    const guestLinks = (
      <DropdownMenu right>
        <Link to='/login'>
          <DropdownItem>Login</DropdownItem>
        </Link>
        <Link to='/signup'>
          <DropdownItem>Registro</DropdownItem>
        </Link>
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
                <Link to='/services'>
                  <NavLink>Serviços</NavLink>
                </Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
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
