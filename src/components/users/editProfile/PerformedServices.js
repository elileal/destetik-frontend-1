import React, { Component } from 'react';
import { Row, Table, Button } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Api from '../../../services/Api/index';

import ModalRating from './ModalRating';
import ConfirmModal from './ConfirmModal';
import RefusedModal from './RefusedModal';

export class PerformedServices extends Component {
  state = {
    asClient: true,
    performedServices: [],
    showModal: {
      rating: false,
      confirmModal: false,
      refusedModal: false
    },
    activePerformedServiceId: ''
  };

  async componentDidMount() {
    const servicesAsClient = await Api.PerformedServices.getPerformedServicesAsClient();
    const servicesAsProvider = await Api.PerformedServices.getPerformedServicesAsProvider();
    this.setState({
      servicesAsClient,
      servicesAsProvider,
      performedServices: servicesAsClient
    });
    console.log(servicesAsClient);
    console.log(servicesAsProvider);
  }

  toggleModal = (e, modalName) => {
    if (e) {
      e.preventDefault();
      const serviceId = e.target.parentNode.parentNode.parentNode.getAttribute(
        'data-key'
      );
      this.setState({
        activePerformedServiceId: serviceId
      });
    }
    this.setState({
      showModal: {
        ...this.state.showModal,
        [modalName]: !this.state.showModal[modalName]
      }
    });
  };

  submitRating = async rate => {
    const newRate = {
      rate,
      performedServiceId: this.state.activePerformedServiceId
    };
    const response = await Api.PerformedServices.rateService(newRate);
    if (response.error) {
      this.setState({
        showModal: {
          refusedModal: true
        },
        error: response.error
      });
    } else {
      this.setState({
        showModal: {
          confirmModal: true
        }
      });
    }
  };

  asProvider = () => {
    this.setState({
      performedServices: this.state.servicesAsProvider,
      asClient: false
    });
  };
  asClient = () => {
    this.setState({
      performedServices: this.state.servicesAsClient,
      asClient: true
    });
  };

  render() {
    const styleContainer = {
      height: 80 + '%',
      display: 'flex',
      justifyContent: 'center',
      padding: '10px'
    };

    return (
      <>
        <h4 style={{ textAlign: 'left' }}>Histórico</h4>
        <Row className="justify-content-end px-2">
          <Button onClick={this.asProvider} className="btn-custom-primary">
            Realizado por mim
          </Button>
          <Button
            onClick={this.asClient}
            className="btn-custom-secondary"
            style={{ marginLeft: 10 }}
          >
            Realizado por outros
          </Button>
        </Row>
        <Row style={styleContainer}>
          <Table responsive>
            <thead>
              <tr>
                <th>Serviço</th>
                <th>Preço</th>
                <th>{this.state.asClient ? 'Realizado Por' : 'Cliente'}</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {this.state.performedServices.map(performedService => (
                <tr key={performedService._id} data-key={performedService._id}>
                  <td>{performedService.providedServiceId.serviceId.name}</td>
                  <td>R$ {performedService.providedServiceId.price}</td>
                  <td>{performedService.providedServiceId.userId.name}</td>
                  <td>
                    <p>
                      <i
                        className="fas fa-star-half-alt edit-icon custom-icon"
                        onClick={e => this.toggleModal(e, 'rating')}
                      />
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
        <ModalRating
          open={this.state.showModal.rating}
          toggle={this.toggleModal}
          submitRating={this.submitRating}
        />
        <ConfirmModal
          message="Sua avaliação foi enviada."
          open={this.state.showModal.confirmModal}
          toggle={this.toggleModal}
        />
        <RefusedModal
          message={this.state.error}
          open={this.state.showModal.refusedModal}
          toggle={this.toggleModal}
        />
      </>
    );
  }
}

PerformedServices.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PerformedServices);
