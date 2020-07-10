import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack'; //added with bundler
import config from '../webpack.config.dev'; //added with bundler

/* eslint-disable no-console */

const port =  3000;
const app = express();
const compiler = webpack(config); //added with bundler


//added with bundler
app.use(require('webpack-dev-middleware') (compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/users', function(req, res) {
  // Hard codeing for simplicity. Pretend this hits a real database
  res.json([
    {"id": 1,"firstName":"Bob","lastName":"Smith","email":"bob@gmail.com"},
    {"id": 2,"firstName":"Dory","lastName":"Hammer","email":"dory@gmail.com"},
    {"id": 3,"firstName":"Mark","lastName":"Fire","email":"mark@gmail.com"}
  ]);
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port)
  }
});

