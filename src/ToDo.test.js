import React from 'react';
import ReactDOM from 'react-dom';
import ToDo from './ToDo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ToDo />, div);
});
