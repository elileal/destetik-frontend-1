import React, { Component } from 'react';
import { Form, Button, FormGroup, Input, FormFeedback } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser, loginWithFacebook } from '../../actions/authActions';
import checkValidation from '../../utils/checkValidation';
import Fade from 'react-reveal/Fade';
import Facebook from './Facebook';
import Google from './Google';

export class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/edit/dados-pessoais');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/edit/dados-pessoais');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const user = { email, password };
    this.props.loginUser(user);
  };

  render() {
    const headerStyle = {
      color: '#495057',
      fontSize: '70px'
    };

    const { errors } = this.props;
    const validation = checkValidation(errors);

    const { email, password } = this.state;
    return (
      <Fade top>
        <div
          className="centered-container"
          style={{ alignItems: 'space-around' }}
        >
          <h1 className="logo" style={headerStyle}>
            Destetik
          </h1>
          <Form method="POST" onSubmit={this.handleSubmit}>
            <h5>Login</h5>
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
              <Button
                className="btn-custom-primary-outline"
                type="submit"
                style={{ width: '100%' }}
              >
                Login
              </Button>
            </FormGroup>
            <h5>Login</h5>
            <p>Faça login com uma de suas redes sociais</p>
            <FormGroup row>
              <Google />
            </FormGroup>
            <FormGroup row>
              <Facebook loginAction={this.props.loginWithFacebook} />
            </FormGroup>
            <p style={{ marginTop: 16 + 'px' }}>
              Ainda não registrado? <a href="/signup">Registre-se aqui.</a>
            </p>
          </Form>
        </div>
      </Fade>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  loginWithFacebook: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser, loginWithFacebook }
)(Login);
