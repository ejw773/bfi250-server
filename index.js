const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const jsonParser = bodyParser.json();
const textParser = bodyParser.text();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const Sequelize = require('sequelize');
const { User } = require('./models');
const { Status } = require('./models');

// Get
app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/status', urlencodedParser, async (req, res) => {
  const status = await Status.findAll();
  res.json(status);
});

app.get('/status/:userid', urlencodedParser, async (req, res) => {
  console.log(req.params);
  const status = await Status.findAll({
    where: {
      userID: req.params.userid
    }
  });
  res.json(status);
})

// Post
app.post('/users', urlencodedParser, async (req, res) => {
  console.log(req.body);
  const { name, email } = req.body;
  const newUser = await User.create({
    name,
    email
  });
  res.json({
    id: newUser.id
  })
});

app.post('/status', jsonParser, async (req, res) => {
  console.log(req.body);
  const { userID, imdbID, status } = req.body;
  const newStatus = await Status.create({
    userID,
    imdbID,
    status
  });
  res.json({
    userID: userID,
    imdbID: imdbID,
    status: status
  })
});

// Delete
app.delete('/delete/:userID/:imdbID', async (req, res) => {
  console.log(req.params);
  const { userID, imdbID } = req.params;
  const deleteStatus = await Status.destroy({
    where: {
      userID,
      imdbID
    }
  });
  res.json({
    userID,
    imdbID
  })
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});
