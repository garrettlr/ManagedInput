import React from 'react';
import AirlineAutoCompleteProvider from './containers/AirlineAutoCompleteProvider';
import ReactDOM from 'react-dom';
import { AutoComplete } from './components';

// renders the react app
const render = Component => {
  ReactDOM.render(
    <Component />,
    document.getElementById('app')
  );
}

render(AirlineAutoCompleteProvider(AutoComplete));