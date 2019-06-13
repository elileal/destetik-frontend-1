import React from 'react';
import { Button } from 'reactstrap';
import Zoom from 'react-reveal/Zoom';
import Api from '../../../services/Api/index';
import { logoutUser } from '../../../actions/authActions';
import { connect } from 'react-redux';

function DeleteAccount(props) {
  const onDelete = async e => {
    e.preventDefault();
    await Api.Users.deleteAccount();
    props.logoutUser();
    window.location.href = '/signup';
  };
  return (
    <Zoom left>
      <h4 style={{ textAlign: 'left' }}>Excluir Conta</h4>
      <div className="delete-account-confirm">
        <p>Você deseja excluir sua conta?</p>
        <Button className="btn-custom-primary" onClick={onDelete}>
          Excluir
        </Button>
      </div>
    </Zoom>
  );
}

export default connect(
  null,
  { logoutUser }
)(DeleteAccount);
