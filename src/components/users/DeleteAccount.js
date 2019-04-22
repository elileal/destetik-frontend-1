import React from 'react';
import { Button, Container } from 'reactstrap';
import api from '../../services/api';
import { logoutUser } from '../../actions/authActions';
import { connect } from 'react-redux';

function DeleteAccount(props) {
  const styleTitle = {
    textAlign: 'left'
  };

  const styleContainer = {
    height: 50 + '%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const onDelete = async e => {
    e.preventDefault();
    await api.delete('/api/user/delete');
    props.logoutUser();
    window.location.href = '/signup';
  };
  return (
    <>
      <h1 style={styleTitle}>Excluir Conta</h1>
      <Container style={styleContainer}>
        Você deseja excluir sua conta?
        <Button onClick={onDelete}>Excluir</Button>
      </Container>
    </>
  );
}

export default connect(
  null,
  { logoutUser }
)(DeleteAccount);
