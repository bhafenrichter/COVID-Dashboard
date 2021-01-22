import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './Components/app';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
  document.getElementById('root')
);
