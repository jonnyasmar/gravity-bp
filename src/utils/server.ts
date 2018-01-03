import * as path from 'path';
const twig = require('twig').__express;
const express = require('express');
const compression = require('compression');

const pkg = require('../../package.json');
const version = pkg.version;

let app = express(),
  ip = '0.0.0.0',
  port = 3000,
  views = path.resolve('./src/views');

app.use(compression());
app.use(express.static('public'));
app.set('view engine', 'twig');
app.engine('.twig', twig);
app.set('views', views);

// Routes
app.get("*", function(req: any, res: any, next: any){
  // vars
  res.locals.version = version;

  res.render('index');
});

let server = app.listen(port, ip, function(){
  let host = server.address().address;
  let port = server.address().port;
  console.log('Gravity Boilerplate ready at http://%s:%s', host, port);
});