import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from '@auth0/auth0-react';
import { audience } from './config';

ReactDOM.render(<Auth0Provider
  domain="dev-ms59jlua.eu.auth0.com"
  clientId="2g5NpjpnscxUoBRc0yQolIKaXZF8PmuS"
  redirectUri={window.location.origin}
  audience={audience}
  scope="create:post update:post delete:post"
  useRefreshTokens={true}
>
  <App />
</Auth0Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
