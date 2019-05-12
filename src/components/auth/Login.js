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
      fontSize: '70px',
      marginBottom: '35px'
    };
    return (
      <div style={{ marginTop: '7%' }}>
        <h1 className='logo' style={headerStyle}>
          Destetik
        </h1>
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
            Ainda não registrado? <a href='/signup'>Registre-se aqui.</a>
          </p>
        </Form>
      </div>
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
