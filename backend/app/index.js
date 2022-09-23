const express = require('express');
const cors = require('cors');
const app = express();

const router = require('./routes');

app.use(cors());
const port = 8080;

app.use(router);

const server = app.listen(port, () => {
	console.log(`Magic happens on port %s...`, server.address().port);
});
