import React from 'react';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';

function RefusedModal(props) {
  return (
    <Modal
      isOpen={props.open}
      toggle={e => props.toggle(e, 'refusedModal')}
      centered
    >
      <ModalBody className="modal-container">
        <i className="material-icons refused-icon-modal icon-modal modal-elements">
          report_problem
        </i>
        <h2 className="modal-elements">Ops!</h2>
        <h5 className="modal-elements">{props.message}</h5>
      </ModalBody>
      <ModalFooter>
        <Button
          color="secondary"
          onClick={e => props.toggle(e, 'refusedModal')}
        >
          Ok
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default RefusedModal;
