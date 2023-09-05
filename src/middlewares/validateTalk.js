const regexData = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

const validateRange = (number) => {
  const newNumber = Number(number);
  if (newNumber < 1 || !Number.isInteger(newNumber) || newNumber > 5) {
    return true;
  }
  return false;
};

const validateDate = (req, res, next) => {
  const { date } = req.query;

  if (!date) return next();

  if (!regexData.test(date)) {
    return res.status(400)
    .json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' }); 
}

  next();
};

const validateTalkWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  
  if (watchedAt === undefined) {
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
  const { rate } = req.body.talk || req.query;
  const { path } = req.route;
  const result = validateRange(rate);

  if (rate === undefined) {
    if (path !== '/search') {
      return res.status(400)
      .json({ message: 'O campo "rate" é obrigatório' });
} 
    return next();
  }

  if (result) {
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

const validateRate = (req, res, next) => {
  const { rate } = req.body;
  const result = validateRange(rate);
  
  if (rate === undefined) {
      return res.status(400)
      .json({ message: 'O campo "rate" é obrigatório' });
} 

  if (result) {
    return res.status(400)
    .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  
  next();
};

module.exports = { 
  validateTalk,
  validateTalkWatchedAt,
  validateTalkRate,
  validateDate,
  validateRate,
};