import React, { Component } from 'react';
import { Form, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

import InputField from '../layout/InputField';

export class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/profile/edit');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/profile/edit');
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
    console.log(user);
    this.props.loginUser(user);
    console.log(user);
  };

  render() {
    return (
      <>
        <Form method='POST' onSubmit={this.handleSubmit}>
          <InputField
            type='email'
            name='email'
            placeholder='Email'
            onChange={this.handleOnChange}
            value={this.state.email}
          />
          <InputField
            type='password'
            name='password'
            placeholder='Senha'
            onChange={this.handleOnChange}
            value={this.state.password}
          />
          <Button type='submit'>Login</Button>
          <p style={{ marginTop: 16 + 'px' }}>
            Ainda não registrado? <a href='/'>Registre-se aqui.</a>
          </p>
        </Form>
      </>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);