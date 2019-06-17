import React, { Component } from 'react';
import { Container, Row, Col, Media, Button } from 'reactstrap';
import StarRatingComponent from 'react-star-rating-component';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Api from '../../../services/Api/index';

import Map from './Map';
import DisplayInfo from './DisplayInfo';
import DisplayProvidedService from './DisplayProvidedService';
import ModalContractService from './ModalContractService';
import ConfirmModal from '../editProfile/ConfirmModal';

export class Profile extends Component {
  state = {
    user: {},
    geoLocation: {
      lat: 0,
      lng: 0
    },
    showModal: {
      contract: false,
      confirmModal: false
    },
    contractService: '',
    services: {}
  };

  async componentDidMount() {
    const userId = this.props.match.params.id;
    const response = await Api.Users.show(userId);
    const services = {};
    response.services.forEach(
      service => (services[service.serviceId.name] = service._id)
    );
    this.setState({
      user: response,
      services,
      geoLocation: response.address
        ? response.address.geoLocation
        : { lng: 0, lat: 0 }
    });
  }

  toggleModal = (e, modalName) => {
    this.setState({
      showModal: {
        ...this.state.showModal,
        [modalName]: !this.state.showModal[modalName]
      }
    });
  };

  _renderMap() {
    if (this.state.user.address) {
      const { geoLocation } = this.state.user.address;
      return <Map geoLocation={[geoLocation.lng, geoLocation.lat]} />;
    }
    return '';
  }

  _renderAddress() {
    if (this.state.user.address) {
      const { address } = this.state.user;
      return `${address.street}, ${address.houseNumber} - ${
        address.district
      } - ${address.city}`;
    }
    return '';
  }

  handleServiceOnChange = e => {
    this.setState({
      contractService: this.state.services[e.target.value]
    });
  };

  handleContractService = async e => {
    const contractService = {
      clientId: this.state.user._id,
      providedServiceId: this.state.contractService
    };
    const response = await Api.PerformedServices.contractService(
      contractService
    );
    this.toggleModal(e, 'contract');
    this.toggleModal(e, 'confirmModal');
    console.log(response);
  };

  render() {
    const { user } = this.state;
    let servicesContent = '';
    if (user.services) {
      servicesContent = user.services.map(service => (
        <DisplayProvidedService
          key={service._id}
          name={service.serviceId.name}
          src={service.serviceId.image}
        />
      ));
    }
    return (
      <Container
        className="profile-container centered-container"
        style={{ width: '60%' }}
      >
        <Row className="profile-row mt-1 mb-1" style={{ height: 0 + 'px' }}>
          <Media
            style={{
              position: 'relative',
              bottom: 70 + 'px'
            }}
            className="profile-image"
            object
            src={user.profileImg}
          />
        </Row>
        <Row className="mt-1 mb-1" style={{ justifyContent: 'flex-end' }}>
          <Col sm={4}>
            <DisplayInfo
              buttonStyle="btn-custom-primary"
              info="Email"
              body={user.email}
            />{' '}
            <DisplayInfo
              buttonStyle="btn-custom-secondary"
              info="Telefone"
              body={user.phone ? user.phone : 'Telefone não adicionado'}
            />
          </Col>
        </Row>
        <h2>{user.name}</h2>
        <StarRatingComponent
          name="star-rating"
          value={user.rating}
          emptyStarColor="grey"
          starColor="#d46da9"
        />
        <h6>{user.rates ? user.rates.length : '0'} Avaliações</h6>
        <Row className="profile-row mt-4 mb-4">{servicesContent}</Row>
        <h6>{this._renderAddress()}</h6>
        {this._renderMap()}
        <Row className="profile-row mt-2 mb-2">
          Serviços a partir de R$ 30.00
        </Row>
        <Row className="profile-row mt-4">
          {this.props.auth.isAuthenticated ? (
            <Button
              className="btn-custom-primary-outline"
              onClick={e => this.toggleModal(e, 'contract')}
            >
              Contratar Serviços
            </Button>
          ) : (
            ''
          )}
        </Row>
        <ModalContractService
          open={this.state.showModal.contract}
          toggle={this.toggleModal}
          services={user.services ? user.services : []}
          handleServiceOnChange={this.handleServiceOnChange}
          handleContractService={this.handleContractService}
        />
        <ConfirmModal
          open={this.state.showModal.confirmModal}
          toggle={this.toggleModal}
          message="Serviço adquirido com sucesso."
        />
      </Container>
    );
  }
}
Profile.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Profile);
