import React, { Component } from 'react';
import { Button, Row } from 'reactstrap';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ModalService from './ModalService';
import api from '../../services/api';

export class AddService extends Component {
  state = {
    modal: false,
    servicesName: []
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  async componentDidMount() {
    const response = await api.get('/api/provided/avaliable');
    const servicesName = response.data.map(service => service.name);
    this.setState({ servicesName });
  }

  render() {
    const styleTitle = {
      textAlign: 'left'
    };

    const styleContainer = {
      height: 70 + '%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };

    const styleButton = {
      display: 'flex',
      justifyContent: 'center'
    };

    const styleFloat = {
      display: 'flex',
      justifyContent: 'flex-end'
    };
    return (
      <>
        <Row style={styleTitle}>
          <h1>Serviços Disponíveis</h1>
        </Row>
        <Row style={styleContainer}>Container</Row>
        <Row style={styleFloat}>
          <Fab size='medium' onClick={this.toggle}>
            <Icon>add_icon</Icon>
          </Fab>
        </Row>
        <Row style={styleButton}>
          <Button>Salvar</Button>
        </Row>
        <ModalService
          modal={this.state.modal}
          toggle={this.toggle}
          servicesName={this.state.servicesName}
        />
      </>
    );
  }
}

AddService.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AddService);
