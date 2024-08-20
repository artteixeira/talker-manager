const express = require('express');

const { 
  readAllTalkers, 
  getTalkerById, 
  addNewTalker, 
  editTalkerById,
  deleteTalkerById,
  filterTalkersByQuery,
  updateTalkers, 
} = require('../utils/talkersUtils');

const validateToken = require('../middlewares/validateToken');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateAllTalk = require('../middlewares/validateTalk');
const validateId = require('../middlewares/validateId');
const findAll = require('../db/talkerDB');

const { 
  validateTalk, 
  validateTalkRate, 
  validateTalkWatchedAt, 
  validateDate, 
  validateRate, 
} = validateAllTalk;

const router = express.Router();

router.get('/', async (_req, res) => {
  const allTalkers = await readAllTalkers();
  res.status(200).json(allTalkers);
});

router.get('/search', validateToken, validateTalkRate, validateDate, async (req, res) => {
  const allTalkers = await readAllTalkers();
  const talkers = await filterTalkersByQuery(req.query);

  if (!req.query.q && !req.query.rate && !req.query.date) {
    return res.status(200).json(allTalkers);
  }
  
  if (!talkers) {
    return res.status(200).json([]);
  }

  res.status(200).json(talkers);
});

router.get('/db', async (_req, res) => {
  const [result] = await findAll();
  
  res.status(200).json(result);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getTalkerById(id);
  if (!talker) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
});

router.post('/', 
  validateToken, 
  validateName, 
  validateAge, 
  validateTalk,
  validateTalkWatchedAt,
  validateTalkRate,
    async (req, res) => {
      const { name, age, talk } = req.body;
      const newTalker = await addNewTalker(name, age, talk);
      res.status(201).json(newTalker);
});

router.put('/:id', 
  validateToken, 
  validateName, 
  validateAge, 
  validateTalk,
  validateTalkWatchedAt,
  validateTalkRate,
  validateId,
    async (req, res) => {
      const { id } = req.params;
      const { name, age, talk } = req.body;
      const editTalker = await editTalkerById(id, name, age, talk);
      res.status(200).json(editTalker);
});

router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  deleteTalkerById(id);

  res.status(204).end();
});

router.patch('/rate/:id', validateToken, validateRate, async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;

  updateTalkers(id, Number(rate));

  res.status(204).end();
});

module.exports = router;