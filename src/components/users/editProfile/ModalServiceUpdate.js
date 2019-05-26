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
      <button className="close" onClick={this.props.toggle}>
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
            Atualizar Serviço
          </ModalHeader>
          <ModalBody>
            <Form>
              Preço:
              <Input
                type="number"
                name="price"
                onChange={this.props.handlePriceUpdateOnChange}
              />
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.props.updateService}>Atualizar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalService;
