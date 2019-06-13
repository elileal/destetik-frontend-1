import React from 'react';
import { Row, Col, Media } from 'reactstrap';
import { Link } from 'react-router-dom';

function ProvidedService(props) {
  const styleCol = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0
  };

  const styleServices = {
    margin: '10px',
    width: '32px',
    height: '32px',
    borderRadius: '15px'
  };

  return (
    <>
      <Row style={{ height: '100%', alignItems: 'center' }}>
        <Col style={styleCol}>
          <Link to={`profile/${props.user.id}`}>
            <Media
              className="username-image"
              style={{
                borderRadius: '30px',
                width: '64px',
                height: '64px'
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
