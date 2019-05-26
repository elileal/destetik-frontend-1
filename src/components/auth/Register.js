import React, { Component } from 'react';
import { Form, Button, FormGroup, Input, FormFeedback } from 'reactstrap';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import checkValidation from '../../utils/checkValidation';

export class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/profile/edit');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newUser = this.state;
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { name, email, password, password2 } = this.state;

    const { errors } = this.props;
    const validation = checkValidation(errors);
    return (
      <div
        className="centered-container"
        style={{ width: '400px', marginTop: '3%' }}
      >
        <Form
          className="register-form"
          method="POST"
          onSubmit={this.handleSubmit}
        >
          <FormGroup>
            <h3>Crie sua Conta</h3>
            <h6>É rápido, prático e totalmente grátis.</h6>
          </FormGroup>
          <FormGroup row>
            <Input
              {...validation.nameValidation}
              type="text"
              name="name"
              placeholder="Nome"
              value={name}
              onChange={this.handleOnChange}
            />
            <FormFeedback>{errors.name}</FormFeedback>
          </FormGroup>
          <FormGroup row>
            <Input
              {...validation.emailValidation}
              type="email"
              name="email"
              placeholder="E-mail"
              value={email}
              onChange={this.handleOnChange}
            />
            <FormFeedback>{errors.email}</FormFeedback>
          </FormGroup>
          <FormGroup row>
            <Input
              {...validation.passwordValidation}
              type="password"
              name="password"
              placeholder="Senha"
              value={password}
              onChange={this.handleOnChange}
            />
            <FormFeedback>{errors.password}</FormFeedback>
          </FormGroup>
          <FormGroup row>
            <Input
              {...validation.password2Validation}
              type="password"
              name="password2"
              placeholder="Confirme sua Senha"
              value={password2}
              onChange={this.handleOnChange}
            />
            <FormFeedback>{errors.password2}</FormFeedback>
          </FormGroup>
          <Button type="submit">Registre-se</Button>
          <p style={{ marginTop: 16 + 'px' }}>
            Já registrado? <a href="/login">Faça o login aqui.</a>
          </p>
        </Form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
