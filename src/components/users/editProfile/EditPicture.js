import React from 'react';
import { Button, Form, FormGroup, Input, Spinner } from 'reactstrap';
import api from '../../../services/api';
import { connect } from 'react-redux';

class EditPicture extends React.Component {
  state = {
    file: null,
    uploading: false
  };

  handleSubmit = async e => {
    this.setState({ uploading: true });
    if (this.state.file) {
      e.preventDefault();
      const formData = new FormData();
      formData.append('image_profile', this.state.file);
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      await api.patch('/api/user/image_update', formData, config);
      window.location.href = '/edit/dados-pessoais';
      this.setState({ uploading: false });
    }
  };

  handleOnChange = e => {
    this.setState({ file: e.target.files[0] }, () => {
      console.log(this.state.file);
    });
  };
  render() {
    const formPicture = (
      <Form
        style={{ justifyContent: 'center' }}
        onSubmit={this.handleSubmit}
      >
        <FormGroup>
          <h5>Escolhe uma foto para perfil:</h5>
          <Input
            style={{border: '1px solid #f0b8e0', padding: '2px', borderRadius: '5px'}}
            onChange={this.handleOnChange}
            type='file'
            name='file'
            id='profileImage'
          />
        </FormGroup>
        <FormGroup>
          <Button type='submit'>Enviar</Button>
        </FormGroup>
      </Form>
    );

    return (
      <>
        <h4 style={{ textAlign: 'left' }}>Editar Foto</h4>
        <div className='delete-account-confirm'>
          {this.state.uploading ? (
            <Spinner style={{ color: '#f0b8e0' }} />
          ) : (
            formPicture
          )}
        </div>
      </>
    );
  }
}

export default connect(
  null,
  {}
)(EditPicture);
