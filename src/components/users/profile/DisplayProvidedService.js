import React from 'react';
import { Media, Col } from 'reactstrap';

function DisplayProvidedService(props) {
  return (
    <>
      <Col md={2}>
        <Media
          style={{
            width: `${64}px`,
            height: `${64}px`
          }}
          object
          src={props.src}
        />
        <h6>{props.name}</h6>
      </Col>
    </>
  );
}

export default DisplayProvidedService;
