const path = require('path');
const express = require('express');
const compression = require('compression');

const pkg = require('../../package.json');
const version = pkg.version;

let app = express(),
  ip = '0.0.0.0',
  port = 3000,
  views = path.resolve('./src/views');

app.use(compression());
app.use(express.static('app'));

// Routes
app.get('*', (req: any, res: any, next: any) => {
  // vars
  res.locals.version = version;
});

let server = app.listen(port, ip, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Gravity Boilerplate ready at http://%s:%s', host, port);
});
