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

class ModalContractService extends React.Component {
  render() {
    const closeBtn = (
      <button className="close" onClick={e => this.props.toggle(e, 'contract')}>
        &times;
      </button>
    );

    return (
      <>
        <Modal isOpen={this.props.open} className={this.props.className}>
          <ModalHeader close={closeBtn}>Contratar Serviço</ModalHeader>
          <ModalBody>
            <Form>
              Serviço:
              <Input
                type="select"
                bsSize="sm"
                name="service"
                onChange={this.props.handleServiceOnChange}
              >
                <option>Selecione um serviço...</option>
                {this.props.services.map(service => (
                  <option key={service._id} data-key={service._id}>
                    {service.serviceId.name}
                  </option>
                ))}
              </Input>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn-custom-primary-outline"
              onClick={e => this.props.toggle(e, 'contract')}
            >
              Cancelar
            </Button>
            <Button
              className="btn-custom-secondary"
              onClick={this.props.handleContractService}
            >
              Adicionar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default ModalContractService;
