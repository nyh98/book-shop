const express = require('express');
const { Genre } = require('../sequelize/models');

const genreRouter = express.Router();
//남용환
genreRouter.get('/', async (req, res) => {
  const rows = await Genre.findAll();
  res.status(200).json(rows);
});

module.exports = genreRouter;
