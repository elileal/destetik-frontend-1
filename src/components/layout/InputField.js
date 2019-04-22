import React from 'react';
import { FormGroup, Col, Input } from 'reactstrap';

function InputField(props) {
  return (
    <FormGroup row>
      <Col>
        <Input
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
      </Col>
    </FormGroup>
  );
}

export default InputField;
