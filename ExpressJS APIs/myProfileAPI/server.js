const express = require('express');
const sequelize = require('./sequelize');
const app = express();
const config = require('./config');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

sequelize
  .sync()
  .then(() => {
    console.log('Database synchronized.');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

const usersRouter = require('./routes/users');
const profilesRouter = require('./routes/profiles');

app.use(usersRouter);
app.use(profilesRouter);

app.listen(config.server.port, () =>
  console.log(`Server on port:${config.server.port}`),
);
