import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

import './App.css';
import 'react-sidemenu/dist/side-menu.css';

import { Container } from 'reactstrap';
import NavBarDestetik from './components/layout/NavBarDestetik';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import EditProfile from './components/users/EditProfile';
import ProvidedServicesContainer from './components/providedServices/ProvidedServicesContainer';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  //Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    const style = {
      height: 100 + '%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    };
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <NavBarDestetik />
            <Container style={style}>
              <Route path='/profile/edit' component={EditProfile} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Register} />
              <Route
                exact
                path='/services'
                component={ProvidedServicesContainer}
              />
            </Container>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;