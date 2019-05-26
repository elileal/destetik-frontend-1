import React from 'react';
import { Row, Col, Media } from 'reactstrap';
import { Link } from 'react-router-dom';

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
        <Col sm="2" style={styleCol}>
          <Link to={`profile/${props.user.id}`}>
            <Media
              style={{
                borderRadius: 30 + 'px',
                width: 64 + 'px',
                height: 64 + 'px'
              }}
              object
              src={props.user.profileImg}
            />
          </Link>
        </Col>
        <Col sm="5" style={{ ...styleCol, flexDirection: 'column' }}>
          <Link className="username-link" to={`profile/${props.user.id}`}>
            <p className="user-text">{props.user.name}</p>
          </Link>
          <p className="user-text">
            {props.user.rating} ( {props.user.qtEvaluation} avaliações ){' '}
          </p>
        </Col>
        <Col sm="2" style={styleCol}>
          {props.user.services.map(item => (
            <Media
              key={item._id}
              style={styleServices}
              object
              src={item.serviceId.image}
            />
          ))}
        </Col>
        <Col sm="3" style={styleCol}>
          <p style={{ margin: 2 + 'px' }}>
            A partir de R$ {props.user.minimumPrice}
          </p>
        </Col>
      </Row>
      <hr />
    </>
  );
}

export default ProvidedService;
