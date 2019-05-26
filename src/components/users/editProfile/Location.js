import React, { Component } from 'react';
import { Form, FormGroup, Input, Button, Col, Row } from 'reactstrap';
import ConfirmModal from './ConfirmModal';

class Location extends Component {
  state = {
    cep: '',
    street: '',
    district: '',
    city: '',
    houseNumber: '',
    visible: false
  };

  // let street, district, houseNumber;
  // street = district = houseNumber = '';
  // if (response.data.address) {
  //   street = response.data.address.street;
  //   district = response.data.address.district;
  //   houseNumber = response.data.address.houseNumber;
  // }

  toggle = () => {
    this.setState({ visible: !this.state.visible });
  };

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.toggle();
  };

  render() {
    const { visible } = this.state;

    return (
      <>
        <ConfirmModal visible={visible} toggle={this.toggle} />
        <h4 style={{ textAlign: 'left' }}>Localização</h4>
        <Form
          style={{
            height: '90%',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
          method="POST"
          onSubmit={this.handleSubmit}
        >
          <FormGroup>
            <FormGroup row>
              <Col md="3">
                CEP:
                <Input
                  type="text"
                  name="cep"
                  onChange={this.handleOnChange}
                  value={this.state.cep}
                />
              </Col>
              <Col md="11">
                Rua:
                <Input
                  type="email"
                  name="street"
                  onChange={this.handleOnChange}
                  value={this.state.street}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="4">
                Bairro:
                <Input
                  type="text"
                  name="district"
                  onChange={this.handleOnChange}
                  value={this.state.district}
                />
              </Col>
              <Col md="5">
                Cidade:
                <Input
                  type="text"
                  name="city"
                  onChange={this.handleOnChange}
                  value={this.state.city}
                />
              </Col>
              <Col md="2">
                Número:
                <Input
                  type="number"
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
      </>
    );
  }
}

export default Location;
