import React, { Component } from 'react';
import { Form, FormGroup, Input, Button, Row } from 'reactstrap';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Slide from 'react-reveal/Slide';

import Api from '../../../services/Api/index';

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
    const response = await Api.Users.current();
    const { name, email } = response;
    const phone = response.phone ? response.phone : '';
    this.setState({ name, email, phone });
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { name, email } = this.state;
    const phone = this.state.phone.split(' ').join('');
    const userNewData = {
      name,
      email,
      phone
    };
    const response = await Api.Users.update(userNewData);
    if (response.status === 200) {
      this.toggle();
    }
  };

  toggle = () => {
    this.setState({ visible: !this.state.visible });
  };

  render() {
    const { visible } = this.state;

    return (
      <Slide right>
        <ConfirmModal
          message="Dados atualizados com sucesso."
          visible={visible}
          toggle={this.toggle}
        />
        <h4 style={{ textAlign: 'left' }}>Dados Pessoais</h4>
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
                mask="(83) 99999-9999"
                alwaysShowMask={false}
              />
            </FormGroup>
          </FormGroup>
          <Row style={{ justifyContent: 'center', paddingTop: '4%' }}>
            <Button className="btn-custom-primary" type="submit">
              Salvar
            </Button>
          </Row>
        </Form>
      </Slide>
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
