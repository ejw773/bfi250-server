const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const Sequelize = require('sequelize');
const { User } = require('./models');
const { Status } = require('./models');


app.get('/', (req, res) => {
  res.send('Hello World!')
});

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

app.get('/status', urlencodedParser, async (req, res) => {
  const status = await Status.findAll({
    include: [{
      model: Status
    }]
  });
  res.json(status);
});

app.get('/status/:userid', urlencodedParser, async (req, res) => {
  const status = await Status.findAll({
    where: {
      userID: 1
    }
  });
  res.json(status);
})

app.post('/status', urlencodedParser, async (req, res) => {
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


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
