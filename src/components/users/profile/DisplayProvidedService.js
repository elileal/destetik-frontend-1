import React from 'react';
import { Media } from 'reactstrap';

function DisplayProvidedService(props) {
  return (
    <>
      <Media object src={props.src} />
      {props.name}
    </>
  );
}

export default DisplayProvidedService;
