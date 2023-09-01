const express = require('express');
const { readAllTalkers, getTalkerById, addNewTalker } = require('../utils/talkersUtils');
const validateToken = require('../middlewares/validateToken');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateAllTalk = require('../middlewares/validateTalk');

const router = express.Router();

router.get('/', async (req, res) => {
  const allTalkers = await readAllTalkers();
  res.status(200).json(allTalkers);
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
    console.log(newTalker);
    res.status(201).json(newTalker);
});

module.exports = router;