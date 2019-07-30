import React from 'react';
import FacebookLogin from 'react-facebook-login';

function Facebook({ loginAction }) {
  const componentClicked = () => {
    console.log('clicked!');
  };

  const responseFacebook = response => {
    const { userID, name, email, picture } = response;
    const user = {
      userID,
      name,
      email,
      picture: picture.data.url
    };
    loginAction(user);
  };

  return (
    <FacebookLogin
      appId="503928410376396"
      autoLoad={false}
      fields="name,email,picture"
      onClick={componentClicked}
      callback={responseFacebook}
      textButton=""
      icon="fa-facebook"
      cssClass="btn btn-secondary btn-facebook"
    />
  );
}

export default Facebook;
