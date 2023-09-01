const fs = require('fs/promises');
const path = require('path');

const talkersPath = path.resolve(__dirname, '../talker.json');

const readAllTalkers = async () => {  
  try {
    const talkers = await fs.readFile(talkersPath, 'utf-8');
    return JSON.parse(talkers);
  } catch (e) {
    return null;
  }
};

const getTalkerById = async (id) => {
    const allTalkers = await readAllTalkers();
    const selectedTalker = allTalkers.find((talker) => talker.id === Number(id));
    return selectedTalker;
};

const addNewTalker = async (name, age, talk) => {
  const talkers = await readAllTalkers();
  const newTalker = { 
    id: talkers[talkers.length - 1].id + 1,
    name,
    age,
    talk, 
    };
  const allTalkers = JSON.stringify([...talkers, newTalker]);
  await fs.writeFile(talkersPath, allTalkers);
  return newTalker;
};

module.exports = {
  readAllTalkers,
  getTalkerById,
  addNewTalker,
};