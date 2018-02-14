const bodyParser = require('body-parser'),
http = require('http'),
express = require('express'),
buscador = require('./buscador');

const port = process.env.PORT || 8097,
      app = express(),
      server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', buscador);
app.use(express.static('public'));

server.listen(port, () => console.log(`Server is running on port ${port}`));