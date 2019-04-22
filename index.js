const express = require('express');
const db = require('./data/db.js');

const server = express();

server.use(express.json());

const PORT = 5000;

server.post('/api/users', (req, res) => {
  const newUser = req.body;
  db.insert(newUser)
    .then(user => {
      if (!user.name || !user.bio) {
        res
          .status(400)
          .json({errorMessage: 'Please provide name and bio for the user.'});
      } else {
        res.status(201).json(user);
      }
    })
    .catch(err =>
      res.status(500).json({
        error: err,
        errorMessage:
          'There was an error while saving the user to the database.'
      })
    );
});

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => res.status(200).json(users))
    .catch(err =>
      res.status(500).json({
        error: err,
        errorMessage: 'The users information could not be retrieved.'
      })
    );
});

server.get('/api/users/:id', (req, res) => {
  const {id} = req.params;
  db.findById(id)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({message: 'The user with the specified ID does not exist.'});
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err =>
      res.status(500).json({
        error: err,
        message: 'The user information could not be retrieved.'
      })
    );
});

server.delete('/api/users/:id', (req, res) => {
  const {id} = req.params;
  db.remove(id)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({message: 'The user with the specified ID does not exist.'});
      } else {
        res.status(204).end();
      }
    })
    .catch(err =>
      res
        .json(500)
        .json({error: err, errorMessage: 'The user could not be removed'})
    );
});

server.put('/api/users/:id', (req, res) => {
  const {id} = req.params;
  const updatedUser = req.body;
  db.update(id, updatedUser)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({message: 'The user with the specified ID does not exist.'});
      } else if (!updatedUser.name || !updatedUser.bio) {
        res
          .status(400)
          .json({errorMessage: 'Please provide name and bio for the user.'});
      } else {
        res.status(202).json(user);
      }
    })
    .catch(err =>
      res.status(500).json({
        error: err,
        errorMessage: 'The user information could not be modified.'
      })
    );
});

server.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
