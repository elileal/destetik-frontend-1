import React, { Component } from 'react';
import { Form, FormGroup, Input, Button, Col, Row } from 'reactstrap';
import InputMask from 'react-input-mask';
import ConfirmModal from './ConfirmModal';
import getAddressFromViaCEP from '../../../services/ViaCepAPI';
import Api from '../../../services/Api/index';

class Location extends Component {
  state = {
    cep: '',
    street: '',
    district: '',
    city: '',
    houseNumber: '',
    visible: false
  };

  async componentDidMount() {
    const response = await Api.Users.current();
    let street, district, houseNumber;
    street = district = houseNumber = '';
    if (response.address) {
      street = response.data.address.street;
      district = response.data.address.district;
      houseNumber = response.data.address.houseNumber;
      this.setState({
        street,
        district,
        houseNumber
      });
    }
  }

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

  handleAddressRequest = async e => {
    const response = await getAddressFromViaCEP(e.target.value);
    this.setState({
      street: response.logradouro,
      district: response.bairro,
      city: response.localidade
    });
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
                <InputMask
                  className="form-control"
                  name="cep"
                  onChange={this.handleOnChange}
                  onBlur={this.handleAddressRequest}
                  value={this.state.cep}
                  mask="99999-999"
                  maskChar=""
                  alwaysShowMask={false}
                />
              </Col>
              <Col md="11">
                Rua:
                <Input
                  type="text"
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
                <InputMask
                  className="form-control"
                  name="houseNumber"
                  onChange={this.handleOnChange}
                  value={this.state.houseNumber}
                  maskChar=""
                  mask="999"
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
