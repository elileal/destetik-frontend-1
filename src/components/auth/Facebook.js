import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

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
      render={renderProps => (
        <button
          className="btn btn-secondary btn-facebook social-media-buttons"
          onClick={renderProps.onClick}
        >
          Login com Facebook
        </button>
      )}
    />
  );
}

export default Facebook;
