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

const editTalkerById = async (id, name, age, talk) => {
  const talkers = await readAllTalkers();

  const index = talkers.findIndex((e) => e.id === Number(id));
  talkers[index] = { id: Number(id), name, age, talk };

  const updateTalkers = JSON.stringify(talkers);

  await fs.writeFile(talkersPath, updateTalkers);

  return talkers[index];
};

const deleteTalkerById = async (id) => {
  const talkers = await readAllTalkers();

  const index = talkers.findIndex((e) => e.id === Number(id));
  talkers.splice(index, 1);

  const updateTalkers = JSON.stringify(talkers);
  await fs.writeFile(talkersPath, updateTalkers);
};

const filterTalkersByQuery = async (query) => {
  const talkers = await readAllTalkers();

  const filteredTalkers = talkers.filter((e) => e.name.includes(query));
  return filteredTalkers;
};

module.exports = {
  readAllTalkers,
  getTalkerById,
  addNewTalker,
  editTalkerById,
  deleteTalkerById,
  filterTalkersByQuery,
};