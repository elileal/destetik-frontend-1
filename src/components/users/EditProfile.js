import React, { Component } from 'react';
import { Container, Col } from 'reactstrap';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SidebarMenu from './SidebarMenu';
import PersonalData from './PersonalData';
import AddService from './AddService';
import DeleteAccount from './DeleteAccount';

export class EditProfile extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  render() {
    const style = {
      display: 'flex',
      height: 90 + '%'
    };

    return (
      <Container style={style}>
        <Col>
          <SidebarMenu />
        </Col>
        <Col>
          <Route
            exact
            path={`${this.props.match.path}/`}
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
