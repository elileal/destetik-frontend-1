import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Input,
  InputGroup,
  Button,
  Spinner
} from 'reactstrap';
import { TransitionGroup } from 'react-transition-group';
import Api from '../../services/Api/index';
import LightSpeed from 'react-reveal/LightSpeed';
import Filters from './Filters';
import ProvidedService from './ProvidedService';

export class ProvidedServicesContainer extends Component {
  state = {
    loading: true,
    search: '',
    users: [],
    filteredUsers: []
  };

  async componentDidMount() {
    this.setState({ filteredUsers: this.state.users });
    const response = await Api.Users.getAll();
    let usersWithServices = response.filter(user => user.services.length > 0);
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
    this.setState({
      users: usersWithServices,
      filteredUsers: usersWithServices,
      loading: false
    });
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({
      filteredUsers: this.state.users.filter(user =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    });
  };

  handleFilterOnChange = e => {
    const serviceFilter = e.target.id;
    this.setState({
      filteredUsers: this.state.users.filter(user => {
        let servicesFiltered = user.services.filter(service => {
          if (service.serviceId._id === serviceFilter) return true;
          return false;
        });
        return servicesFiltered.length > 0;
      })
    });
  };

  resetFilter = () => {
    this.setState({ filteredUsers: this.state.users });
  };

  render() {
    const loadingSpinner = <Spinner color="light" />;
    const providedServicesContent = this.state.filteredUsers.map(user => {
      return (
        <LightSpeed collapse key={user.id}>
          <ProvidedService key={user.id} user={user} />
        </LightSpeed>
      );
    });

    return (
      <div className="provided-services-container">
        <Row className="search-service">
          <Col sm="9">
            <InputGroup>
              <Input
                type="search"
                name="search"
                placeholder="Pesquisar..."
                value={this.state.search}
                onChange={this.handleOnChange}
              />
              <Button className="btn-custom-secondary">
                <i className="fas fa-search" />
              </Button>
            </InputGroup>
          </Col>
          <Col sm="3">
            <Filters
              handleFilterOnChange={this.handleFilterOnChange}
              resetFilter={this.resetFilter}
            />
          </Col>
        </Row>
        <Container className="container-service">
          {this.state.loading ? (
            loadingSpinner
          ) : (
            <TransitionGroup appear={false} enter={true} exit={true}>
              {providedServicesContent}
            </TransitionGroup>
          )}
        </Container>
      </div>
    );
  }
}

export default ProvidedServicesContainer;
