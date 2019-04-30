import React, { Component } from 'react';
import { Container, Row, Col, Media, Button } from 'reactstrap';
import StarRatings from 'react-star-ratings';
import api from '../../services/api';

export class Profile extends Component {
  state = {
    loading: false,
    user: {}
  };

  async componentDidMount() {
    const userId = this.props.match.params.id;
    const response = await api.get(`/api/user/${userId}`);
    console.log(response.data);
    this.setState({ user: response.data });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Media
              style={{
                borderRadius: 30 + 'px',
                width: 96 + 'px',
                height: 96 + 'px',
                position: 'relative',
                top: 30 + 'px'
              }}
              object
              src={`https://destetik-backend.herokuapp.com/uploads/notFound.jpg`}
            />
          </Col>
        </Row>
        <Row style={{ justifyContent: 'flex-end' }}>
          <Col sm={3}>
            <Button color='info'>Telefone</Button>
            <Button color='primary'>Email</Button>
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
        <Row>
          <Col>Serviço 1</Col>
          <Col>Serviço 2</Col>
        </Row>
        <Row>Mapa</Row>
        <Row>Serviços a partir de R$ 30.00</Row>
      </Container>
    );
  }
}

export default Profile;
