import React, { Component } from 'react';
import { Button, Row, Table } from 'reactstrap';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import api from '../../services/api';

import ModalServiceUpdate from './ModalServiceUpdate';
import ModalService from './ModalService';

export class AddService extends Component {
  state = {
    modal: false,
    modalUpdate: false,
    services: [],
    providedServices: [],
    addService: {
      service: '',
      price: ''
    },
    updateService: {
      id: '',
      newPrice: ''
    }
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  toggleUpdate = e => {
    if (e) {
      e.preventDefault();
      const serviceId = e.target.parentNode.parentNode.parentNode.getAttribute(
        'data-key'
      );
      this.setState({
        updateService: {
          id: serviceId
        }
      });
    }
    this.setState(prevState => ({
      modalUpdate: !prevState.modalUpdate
    }));
  };

  async componentDidMount() {
    const response = await api.get('/api/provided/avaliable');
    const services = response.data;
    this.setState({ services });
    const responseProvided = await api.get('/api/provided/show');
    const providedServices = responseProvided.data.map(providedService => ({
      id: providedService._id,
      name: providedService.serviceId.name,
      price: providedService.price
    }));
    this.setState({ providedServices });
  }

  handleServiceOnChange = e => {
    this.setState({
      addService: {
        ...this.state.addService,
        service: e.target.value
      }
    });
  };

  handlePriceOnChange = e => {
    this.setState({
      addService: {
        ...this.state.addService,
        price: e.target.value
      }
    });
  };

  handlePriceUpdateOnChange = e => {
    this.setState({
      updateService: {
        ...this.state.updateService,
        newPrice: e.target.value
      }
    });
  };

  addService = async () => {
    const response = await api.post(
      '/api/provided/create',
      this.state.addService
    );
    const newProvidedService = {
      id: response.data._id,
      price: this.state.addService.price,
      name: this.state.addService.service
    };
    this.setState({
      providedServices: [...this.state.providedServices, newProvidedService]
    });
    this.toggle();
  };

  updateService = async e => {
    const { newPrice } = this.state.updateService;
    await api.patch(`/api/provided/update/${this.state.updateService.id}`, {
      price: newPrice
    });
    this.toggleUpdate();
    window.location.reload();
  };

  deleteService = async e => {
    e.preventDefault();
    const serviceId = e.target.parentNode.parentNode.parentNode.getAttribute(
      'data-key'
    );
    const response = await api.delete(`/api/provided/delete/${serviceId}`);
    const providedServices = this.state.providedServices.filter(
      providedService => providedService.id !== serviceId
    );
    this.setState({ providedServices });
  };

  render() {
    const styleContainer = {
      height: 70 + '%',
      display: 'flex',
      justifyContent: 'center',
      padding: '10px'
    };

    const styleButton = {
      display: 'flex',
      justifyContent: 'center'
    };

    const styleFloat = {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingRight: '30px'
    };
    return (
      <>
        <h4 style={{ textAlign: 'left' }}>Serviços Disponíveis</h4>
        <Row style={styleContainer}>
          <Table responsive>
            <thead>
              <tr>
                <th>Serviço</th>
                <th>Preço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {this.state.providedServices.map(providedService => (
                <tr key={providedService.id} data-key={providedService.id}>
                  <td>{providedService.name}</td>
                  <td>{providedService.price}</td>
                  <td>
                    <p>
                      <i
                        className='fas fa-edit edit-icon custom-icon'
                        onClick={this.toggleUpdate}
                      />
                      {'  '}
                      <i
                        className='fas fa-trash delete-icon custom-icon'
                        onClick={this.deleteService}
                      />
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
        <Row style={styleFloat}>
          <Fab size='medium' onClick={this.toggle}>
            <Icon>add_icon</Icon>
          </Fab>
        </Row>
        <Row style={styleButton}>
          <Button>Salvar</Button>
        </Row>
        <ModalService
          services={this.state.services}
          modal={this.state.modal}
          handlePriceOnChange={this.handlePriceOnChange}
          handleServiceOnChange={this.handleServiceOnChange}
          toggle={this.toggle}
          addService={this.addService}
        />
        <ModalServiceUpdate
          modal={this.state.modalUpdate}
          toggle={this.toggleUpdate}
          updateService={this.updateService}
          handlePriceUpdateOnChange={this.handlePriceUpdateOnChange}
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
