const { getTalkerById } = require('../utils/talkersUtils'); 

const validateId = async (req, res, next) => {
  const { id } = req.params;
  const talker = await getTalkerById(id);

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  next();
};

module.exports = validateId;