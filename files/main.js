global.React = require('react');
global.ReactDOM = require('react-dom');
var Root = require('./root').rt;
var dom = document.getElementById('container');
ReactDOM.render(React.createElement(Root), dom);