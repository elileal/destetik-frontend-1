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
              <Input
                type='select'
                bsSize='sm'
                name='service'
                onChange={this.props.handleServiceOnChange}
              >
                <option>Selecione um serviço...</option>
                {this.props.services.map(service => (
                  <option key={service._id}>{service.name}</option>
                ))}
              </Input>
              Preço:
              <Input
                onChange={this.props.handlePriceOnChange}
                type='number'
                name='price'
              />
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.props.addService}>Adicionar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalService;
