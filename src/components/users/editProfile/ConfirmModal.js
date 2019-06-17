import React from 'react';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';

function ConfirmModal(props) {
  return (
    <Modal isOpen={props.open} toggle={e => props.toggle(e, 'confirmModal')}>
      <ModalBody className="modal-container">
        <i className="material-icons confirm-icon-modal icon-modal modal-elements">
          check_circle
        </i>
        <h2 className="modal-elements">Sucesso!</h2>
        <h5 className="modal-elements">{props.message}</h5>
      </ModalBody>
      <ModalFooter>
        <Button
          className="btn-custom-primary-outline"
          onClick={e => props.toggle(e, 'confirmModal')}
        >
          Ok
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ConfirmModal;
