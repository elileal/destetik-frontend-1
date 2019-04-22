import React from 'react';
import { Row, Col, Media } from 'reactstrap';

function ProvidedService(props) {
  const styleCol = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const styleServices = {
    margin: 10 + 'px',
    width: 32 + 'px',
    height: 32 + 'px',
    borderRadius: 15 + 'px'
  };

  return (
    <>
      <Row>
        <Col sm='2' style={styleCol}>
          <Media
            style={{
              borderRadius: 30 + 'px',
              width: 64 + 'px',
              height: 64 + 'px'
            }}
            object
            src='https://i.imgur.com/nxf8Kph.jpg'
          />
        </Col>
        <Col sm='5' style={{ ...styleCol, flexDirection: 'column' }}>
          <p style={{ margin: 2 + 'px' }}>{props.name}</p>
          <p style={{ margin: 2 + 'px' }}>{props.rating}</p>
        </Col>
        <Col sm='2' style={styleCol}>
          <Media
            style={styleServices}
            object
            src='https://i.imgur.com/s4E3d3u.jpg'
          />
          <Media
            style={styleServices}
            object
            src='https://i.imgur.com/o6RPdiH.jpg'
          />
        </Col>
        <Col sm='3' style={styleCol}>
          <p>A partir de R$ {props.minimumPrice}</p>
        </Col>
      </Row>
      <hr />
    </>
  );
}

export default ProvidedService;
