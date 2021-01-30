const React = require("react");
const { render } = require('react-dom');
const App  = require("./app.js");

const { BrowserRouter} = require('react-router-dom');

const root = document.getElementById('root');

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  root
);