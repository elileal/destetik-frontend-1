import React from 'react';
import { Button } from 'reactstrap';
import api from '../../services/api';
import { logoutUser } from '../../actions/authActions';
import { connect } from 'react-redux';

function DeleteAccount(props) {
  const onDelete = async e => {
    e.preventDefault();
    await api.delete('/api/user/delete');
    props.logoutUser();
    window.location.href = '/signup';
  };
  return (
    <>
      <h4 style={{ textAlign: 'left' }}>Excluir Conta</h4>
      <div className='delete-account-confirm'>
        <p>Você deseja excluir sua conta?</p>
        <Button onClick={onDelete}>Excluir</Button>
      </div>
    </>
  );
}

export default connect(
  null,
  { logoutUser }
)(DeleteAccount);
