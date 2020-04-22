const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const log = console.log;
const app = express();

const items = require('./routes/api/items');

// bodyParser middleware:
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// connect to Mongodb
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => log('MongoDB Connected'))
  .catch((e) => log(e));

// use Routes:
app.use('/api/items', items);

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));

  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  // });
  app.use('*', express.static(path.join(__dirname, 'client', 'build')));
}

// app.get('/', (req, res) => {
//   res.send('hello..!');
// });
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  log(`server is running on port ${PORT}`);
});
