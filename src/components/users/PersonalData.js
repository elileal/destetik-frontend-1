import React, { Component } from 'react';
import { Form, FormGroup, Input, Button, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import api from '../../services/api';

export class PersonalData extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    street: '',
    district: '',
    houseNumber: ''
  };
  async componentDidMount() {
    const { id } = this.props.auth.user;
    const response = await api.get(`/api/user/${id}`);
    const { name, email, phone } = response.data;
    let street, district, houseNumber;
    if (response.data.address) {
      street = response.data.address.street;
      district = response.data.address.district;
      houseNumber = response.data.address.houseNumber;
    }
    this.setState({ name, email, phone, street, district, houseNumber });
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { name, email, phone, street, district, houseNumber } = this.state;
    const updatedUser = {
      name,
      email,
      phone,
      address: {
        street,
        district,
        houseNumber
      }
    };
    const response = await api.patch('/api/user/update', updatedUser);
    console.log(response);
  };
  render() {
    const style = {
      textAlign: 'left'
    };
    return (
      <Form style={style} method='POST' onSubmit={this.handleSubmit}>
        <FormGroup>
          <h1>Dados Pessoais</h1>
          <FormGroup>
            Nome:
            <Input
              type='text'
              name='name'
              onChange={this.handleOnChange}
              value={this.state.name}
            />
          </FormGroup>
          <FormGroup>
            Email:
            <Input
              type='email'
              name='email'
              onChange={this.handleOnChange}
              value={this.state.email}
            />
          </FormGroup>
          <FormGroup>
            Telefone:
            <Input
              type='text'
              name='phone'
              onChange={this.handleOnChange}
              value={this.state.phone}
            />
          </FormGroup>
        </FormGroup>
        <FormGroup>
          <h1>Localização</h1>
          <FormGroup>
            Endereço:
            <Input
              type='text'
              name='street'
              onChange={this.handleOnChange}
              value={this.state.street}
            />
          </FormGroup>
          <FormGroup row>
            <Col>
              Bairro:
              <Input
                type='text'
                name='district'
                onChange={this.handleOnChange}
                value={this.state.district}
              />
            </Col>
            <Col>
              Número:
              <Input
                type='text'
                name='houseNumber'
                onChange={this.handleOnChange}
                value={this.state.houseNumber}
              />
            </Col>
          </FormGroup>
        </FormGroup>
        <Button type='submit'>Salvar</Button>
      </Form>
    );
  }
}

PersonalData.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PersonalData);
