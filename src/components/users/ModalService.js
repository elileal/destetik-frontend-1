import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input
} from 'reactstrap';

class ModalService extends React.Component {
  render() {
    const closeBtn = (
      <button className='close' onClick={this.props.toggle}>
        &times;
      </button>
    );

    return (
      <div>
        <Modal
          isOpen={this.props.modal}
          toggle={this.props.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.props.toggle} close={closeBtn}>
            Adicionar Serviço
          </ModalHeader>
          <ModalBody>
            <Form>
              Serviço:
              <Input type='select' bsSize='sm'>
                {this.props.servicesName.map(serviceName => (
                  <option>{serviceName}</option>
                ))}
              </Input>
              Preço:
              <Input type='number' />
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.props.toggle}>Adicionar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalService;
