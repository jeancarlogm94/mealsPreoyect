const dotenv = require('dotenv');
const { app } = require('./app');

// Utils
const { db } = require('./utils/db.utils');
dotenv.config({ path: './config.env' });

// Server auth
db.authenticate()
  .then(() => {
    console.log('db auth');
  })
  .catch((e) => console.log(e));

// Establish model's relations

// Server sync
db.sync()
  .then(() => {
    console.log('db sync');
  })
  .catch((e) => console.log(e));

app.listen(4000, () => {
  console.log('Server On');
});
