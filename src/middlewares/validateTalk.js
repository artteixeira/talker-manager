const regexData = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

const validateTalkWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  
  if (!watchedAt) {
    return res.status(400)
     .json({ message: 'O campo "watchedAt" é obrigatório' }); 
  }

 if (!regexData.test(watchedAt)) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
  } 

  next();
};

const validateTalkRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  
  if (rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  if (rate < 1 || !Number.isInteger(rate) || rate > 5) {
    return res.status(400)
    .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  
  next();
};

module.exports = { 
  validateTalk,
  validateTalkWatchedAt,
  validateTalkRate,
};