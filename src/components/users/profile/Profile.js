import React, { Component } from 'react';
import { Container, Row, Col, Media } from 'reactstrap';
import StarRatings from 'react-star-ratings';
import api from '../../../services/api';

import DisplayInfo from './DisplayInfo';
import DisplayProvidedService from './DisplayProvidedService';

export class Profile extends Component {
  state = {
    loading: false,
    user: {}
  };

  async componentDidMount() {
    const userId = this.props.match.params.id;
    const response = await api.get(`/api/user/${userId}`);
    this.setState({ user: response.data });
  }

  render() {
    let servicesContent = '';
    if (this.state.user.services) {
      servicesContent = this.state.user.services.map(service => (
        <DisplayProvidedService
          key={service._id}
          name={service.serviceId.name}
          src={`https://destetik-backend.herokuapp.com/${
            service.serviceId.image
          }`}
        />
      ));
    }
    return (
      <Container className='profile-container' style={{ width: '60%' }}>
        <Row className='profile-row mt-1 mb-1' style={{ height: 0 + 'px' }}>
          <Media
            style={{
              position: 'relative',
              bottom: 70 + 'px'
            }}
            className='profile-image'
            object
            src={`https://destetik-backend.herokuapp.com/uploads/notFound.jpg`}
          />
        </Row>
        <Row className='mt-1 mb-1' style={{ justifyContent: 'flex-end' }}>
          <Col sm={3}>
            <DisplayInfo
              colorButton='info'
              info='Email'
              body={this.state.user.email}
            />{' '}
            <DisplayInfo
              colorButton='primary'
              info='Telefone'
              body={
                this.state.user.phone
                  ? this.state.user.phone
                  : 'Telefone não adicionado'
              }
            />
          </Col>
        </Row>
        <h2>{this.state.user.name}</h2>
        <StarRatings
          starDimension='20px'
          rating={this.state.user.rating}
          starRatedColor='grey'
          numberOfStars={5}
        />
        <h6>{this.state.user.qtEvaluation} Avaliações</h6>
        <Row className='profile-row mt-4 mb-4'>{servicesContent}</Row>
        <Row className='profile-row mt-2 mb-2'>Mapa</Row>
        <Row className='profile-row mt-2 mb-2'>
          Serviços a partir de R$ 30.00
        </Row>
      </Container>
    );
  }
}

export default Profile;
