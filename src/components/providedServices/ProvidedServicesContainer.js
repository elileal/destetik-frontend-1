import React, { Component } from 'react';
import { Container, Row, Col, Input, InputGroup, Button } from 'reactstrap';
import api from '../../services/api';

import Filters from './Filters';
import ProvidedService from './ProvidedService';

export class ProvidedServicesContainer extends Component {
  state = {
    search: '',
    users: [],
    filteredUsers: []
  };

  async componentDidMount() {
    this.setState({ filteredUsers: this.state.users });
    const response = await api.get('/api/user');
    let usersWithServices = response.data.filter(
      user => user.services.length > 0
    );
    usersWithServices = usersWithServices.map(user => {
      let minimumPrice = 10000;
      user.services.forEach(service => {
        if (service.price < minimumPrice) minimumPrice = service.price;
      });
      return {
        id: user._id,
        name: user.name,
        rating: user.rating,
        services: user.services,
        qtEvaluation: user.qtEvaluation,
        profileImg: user.profileImg,
        minimumPrice
      };
    });
    console.log(usersWithServices);
    this.setState({ users: usersWithServices });
    this.setState({ filteredUsers: usersWithServices });
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({
      filteredUsers: this.state.users.filter(user =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col sm='9'>
            <InputGroup>
              <Input
                type='search'
                name='search'
                placeholder='Pesquisar...'
                value={this.state.search}
                onChange={this.handleOnChange}
              />
              <Button>
                <i className='fas fa-search' />
              </Button>
            </InputGroup>
          </Col>
          <Col sm='3'>
            <Filters />
          </Col>
        </Row>
        <Row>
          <Container style={{ paddingTop: 50 + 'px' }}>
            {this.state.filteredUsers.map(user => {
              return (
                <ProvidedService
                  name={user.name}
                  rating={user.rating}
                  minimumPrice={user.minimumPrice}
                  qtEvaluation={user.qtEvaluation}
                  profileImg={user.profileImg}
                  services={user.services}
                />
              );
            })}
          </Container>
        </Row>
      </Container>
    );
  }
}

export default ProvidedServicesContainer;
