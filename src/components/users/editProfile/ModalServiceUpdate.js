import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
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
            <Form method="post" onSubmit={this.props.updateService}>
              <FormGroup>
                Preço:
                <Input
                  type="number"
                  name="price"
                  onChange={this.props.handlePriceUpdateOnChange}
                />
              </FormGroup>
              <FormGroup
                style={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <Button className="btn-custom-primary" type="submit">
                  Atualizar
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ModalService;
