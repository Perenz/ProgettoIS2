const http = require('http');
const app = require('./app');
const port = process.env.PORT || 1112;

const server = http.createServer(app);

app.listen(port);