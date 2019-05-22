import React, { Component } from 'react';
import { Container, Col } from 'reactstrap';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import api from '../../../services/api';

import SidebarMenu from './SidebarMenu';
import PersonalData from './PersonalData';
import AddService from './AddService';
import DeleteAccount from './DeleteAccount';
import EditPicture from './EditPicture';

export class EditProfile extends Component {
  state = {
    user: {}
  };

  async componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
    const response = await api.get('/api/user/current');
    this.setState({ user: response.data });
  }

  render() {
    const style = {
      padding: 0,
      width: '70%'
    };
    const { user } = this.state;
    return (
      <Container className='profile-edit-container centered-container' style={style}>
        <SidebarMenu profileImg={user.profileImg} />
        <Col className='profile-edit-item-container'>
          <Route
            exact
            path={`${this.props.match.path}/editar-foto`}
            component={EditPicture}
          />
          <Route
            exact
            path={`${this.props.match.path}/dados-pessoais`}
            component={PersonalData}
          />
          <Route
            exact
            path={`${this.props.match.path}/add-servicos`}
            component={AddService}
          />
          <Route
            exact
            path={`${this.props.match.path}/excluir-conta`}
            component={DeleteAccount}
          />
        </Col>
      </Container>
    );
  }
}

EditProfile.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(EditProfile);
