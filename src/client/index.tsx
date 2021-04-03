import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './Components/app';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { About } from './Components/about/about';

ReactDOM.render(
  <BrowserRouter>
    <CookiesProvider>
      <Switch>
        <Route path="/about">
          <About></About>
        </Route>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </CookiesProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
