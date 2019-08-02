import React from 'react';
import { GoogleLogin } from 'react-google-login';

function Google() {
  const responseGoogle = response => {
    console.log(response);
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      render={renderProps => (
        <button
          className="btn btn-secondary btn-google social-media-buttons"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          Login com Google
        </button>
      )}
      buttonText="Login com Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      icon={false}
      cookiePolicy={'single_host_origin'}
    />
  );
}

export default Google;
