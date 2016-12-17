const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const React = require('react');
const browserify = require('browserify');
app.use(express.static(path.join(__dirname, 'resources')));
app.get('/',(req,res) => {
	res.sendFile(path.join(__dirname,'page','index.html'));
});
app.get('/script.js',(req,res) => {
	try{
		res.setHeader('Content-Type', 'application/javascript');
		browserify()
		  .add(path.join(__dirname, 'files','main.js'))
		  .bundle()
		  .pipe(res)
	}catch(e){
		console.log(e);
	}
});
var server = app.listen(8082,() => {
	console.log('done');
});

