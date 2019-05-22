import React from 'react';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';

function ConfirmModal(props) {
	return (
		<Modal 
			isOpen={props.visible}
			toggle={props.toggle}
			centered
		>
			<ModalBody className='modal-container'>
			<i className='material-icons confirm-icon-modal modal-confirm-elements'>
				check_circle
			</i>
				<h2 className='modal-confirm-elements'>Sucesso!</h2>
				<h5 className='modal-confirm-elements'>Seus dados foram atualizados.</h5>
			</ModalBody>
			<ModalFooter>
				<Button color="secondary" onClick={props.toggle}>Ok</Button>
			</ModalFooter>
		</Modal>
	)
}

export default ConfirmModal
