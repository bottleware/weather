import React from 'react';
import ReactDOM from 'react-dom';
import Library from './components/Library';
import './index.css';

const root = document.getElementById('root');
root.style.height = '100%';
root.style.width = '100%';

ReactDOM.render(
  <React.StrictMode>
    <Library/>
  </React.StrictMode>,
  document.getElementById('root')
);