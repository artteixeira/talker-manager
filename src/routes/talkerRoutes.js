const express = require('express');
const { 
  readAllTalkers, 
  getTalkerById, 
  addNewTalker, 
  editTalkerById,
  deleteTalkerById,
  filterTalkersByQuery, 
} = require('../utils/talkersUtils');
const validateToken = require('../middlewares/validateToken');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateAllTalk = require('../middlewares/validateTalk');
const validateId = require('../middlewares/validateId');

const router = express.Router();

router.get('/', async (req, res) => {
  const allTalkers = await readAllTalkers();
  res.status(200).json(allTalkers);
});

router.get('/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const allTalkers = await readAllTalkers();
  const talkers = await filterTalkersByQuery(q);

  if (!q) {
    return res.status(200).json(allTalkers);
  }
  
  if (!talkers) {
    return res.status(200).json([]);
  }

  res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getTalkerById(id);
  if (!talker) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
});

const { validateTalk, validateTalkRate, validateTalkWatchedAt } = validateAllTalk;

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

module.exports = router;