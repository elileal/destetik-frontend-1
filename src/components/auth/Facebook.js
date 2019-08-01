import React from 'react';
import FacebookLogin from 'react-facebook-login';

function Facebook({ loginAction }) {
  const componentClicked = () => {
    console.log('clicked!');
  };

  const responseFacebook = response => {
    const { accessToken } = response;
    loginAction(accessToken);
  };

  const facebookApiKey = process.env.REACT_APP_FACEBOOK_API_KEY;
  return (
    <FacebookLogin
      appId={facebookApiKey}
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
