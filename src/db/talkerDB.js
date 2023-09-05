const connection = require('./connection');

const findAll = () => connection.execute(`
SELECT
    age,
    id,
    name,
    JSON_OBJECT('rate', talk_rate, 'watchedAt', talk_watched_at) AS talk
FROM TalkerDB.talkers;
`);

module.exports = findAll;