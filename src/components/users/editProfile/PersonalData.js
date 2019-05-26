import React, { Component } from 'react';
import { Form, FormGroup, Input, Button, Col, Row } from 'reactstrap';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import api from '../../../services/api';

import ConfirmModal from './ConfirmModal';

export class PersonalData extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    street: '',
    district: '',
    houseNumber: '',
    visible: false
  };

  async componentDidMount() {
    const response = await api.get('/api/user/current');
    const { name, email } = response.data;
    let street, district, houseNumber;
    street = district = houseNumber = '';
    const phone = response.data.phone ? response.data.phone : '';
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
    const { name, email, street, district, houseNumber } = this.state;
    const phone = this.state.phone
      .split(' ')
      .join('')
      .split('-')
      .join('');
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
    if (response.status === 200) {
      this.toggle();
    }
  };

  toggle = () => {
    this.setState({ visible: !this.state.visible });
  };

  render() {
    const style = {
      textAlign: 'left'
    };
    const { visible } = this.state;

    return (
      <div className="personal-data-container">
        <ConfirmModal visible={visible} toggle={this.toggle} />
        <Form style={style} method="POST" onSubmit={this.handleSubmit}>
          <FormGroup>
            <h4>Dados Pessoais</h4>
            <FormGroup>
              Nome:
              <Input
                type="text"
                name="name"
                onChange={this.handleOnChange}
                value={this.state.name}
              />
            </FormGroup>
            <FormGroup>
              Email:
              <Input
                type="email"
                name="email"
                onChange={this.handleOnChange}
                value={this.state.email}
              />
            </FormGroup>
            <FormGroup>
              Telefone:
              <InputMask
                className="form-control"
                name="phone"
                onChange={this.handleOnChange}
                value={this.state.phone}
                mask="+5\5 99 99999-9999"
                alwaysShowMask={false}
              />
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <h4>Localização</h4>
            <FormGroup>
              Endereço:
              <Input
                type="text"
                name="street"
                onChange={this.handleOnChange}
                value={this.state.street}
              />
            </FormGroup>
            <FormGroup row>
              <Col>
                Bairro:
                <Input
                  type="text"
                  name="district"
                  onChange={this.handleOnChange}
                  value={this.state.district}
                />
              </Col>
              <Col>
                Número:
                <Input
                  type="text"
                  name="houseNumber"
                  onChange={this.handleOnChange}
                  value={this.state.houseNumber}
                />
              </Col>
            </FormGroup>
          </FormGroup>
          <Row style={{ justifyContent: 'center', paddingTop: '4%' }}>
            <Button type="submit">Salvar</Button>
          </Row>
        </Form>
      </div>
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
