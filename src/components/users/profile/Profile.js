import React, { Component } from 'react';
import { Container, Row, Col, Media } from 'reactstrap';
import StarRatings from 'react-star-ratings';
import Api from '../../../services/Api/index';
import Map from './Map';

import DisplayInfo from './DisplayInfo';
import DisplayProvidedService from './DisplayProvidedService';

export class Profile extends Component {
  state = {
    loading: false,
    user: {},
    geoLocation: {
      lat: 0,
      lng: 0
    }
  };

  async componentDidMount() {
    const userId = this.props.match.params.id;
    const response = await Api.Users.show(userId);
    this.setState({
      user: response,
      geoLocation: response.address.geoLocation
    });
  }

  _renderMap() {
    if (this.state.user.address) {
      const { geoLocation } = this.state.user.address;
      return <Map geoLocation={[geoLocation.lng, geoLocation.lat]} />;
    }
    return '';
  }

  _renderAddres() {
    if (this.state.user.address) {
      const { address } = this.state.user;
      return `${address.street}, ${address.houseNumber} - ${
        address.district
      } - ${address.city}`;
    }
    return '';
  }

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
            <DisplayInfo colorButton="info" info="Email" body={user.email} />{' '}
            <DisplayInfo
              colorButton="primary"
              info="Telefone"
              body={user.phone ? user.phone : 'Telefone não adicionado'}
            />
          </Col>
        </Row>
        <h2>{user.name}</h2>
        <StarRatings
          starDimension="20px"
          rating={user.rating}
          starRatedColor="grey"
          numberOfStars={5}
        />
        <h6>{user.qtEvaluation} Avaliações</h6>
        <Row className="profile-row mt-4 mb-4">{servicesContent}</Row>
        <h6>{this._renderAddres()}</h6>
        {this._renderMap()}
        <Row className="profile-row mt-2 mb-2">
          Serviços a partir de R$ 30.00
        </Row>
      </Container>
    );
  }
}

export default Profile;
