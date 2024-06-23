const express = require('express');
const app = express();
const config = require('./config');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


const username = encodeURIComponent(config.mongoose.username);
const password = encodeURIComponent(config.mongoose.password);
const url = `mongodb://${username}:${password}@${config.mongoose.server}:${config.mongoose.port}/${config.mongoose.db}`
console.log(url);

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

const router1 = require('./routes/users');
const router2 = require('./routes/clients');
const router3 = require('./routes/licences');

app.use(router1);
app.use(router2);
app.use(router3);

app.listen(config.server.port, () => {
  console.log(`Server on port: ${config.server.port}`);
});
