import React, { Component } from 'react';
import { Container, Row, Col, Input, InputGroup, Button } from 'reactstrap';
import Filters from './Filters';
import ProvidedService from './ProvidedService';

export class ProvidedServicesContainer extends Component {
  state = {
    search: '',
    users: [
      {
        name: 'Ester Gabrielly Cecília Fernandes',
        rating: '4.8',
        minimumPrice: '30.00'
      },
      {
        name: 'Maria de Jesus Silva',
        rating: '4.3',
        minimumPrice: '20.00'
      },
      {
        name: 'Patrícia Mendes de Nascimento',
        rating: '4.5',
        minimumPrice: '28.00'
      }
    ],
    filteredUsers: []
  };

  componentDidMount() {
    this.setState({ filteredUsers: this.state.users });
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
