// Models
const Dinosaur = require('./models/Dinosaur');
const Dragon = require('./models/Dragon');

const sortByName = (a, b) => {
  if (a.name < b.name) { return -1; }
  if (a.name > b.name) { return 1; }
  return 0;
}

module.exports = function(app, config) {
  // API works (public)
  app.get('/', (req, res) => {
    res.send('API works!');
  });

  // GET dinosaurs data
  app.get('/dinosaurs', (req, res) => {
    Dinosaur.find({}, (err, dinos) => {
      let dinosArr = [];
      if (err) {
        return res.status(500).send(err.message);
      }
      if (dinos) {
        dinos.forEach(dino => {
          dinosArr.push(dino);
        });
        dinosArr.sort(sortByName);
      }
      res.send(dinosArr);
    });
  });

  // GET dragons data
  app.get('/dragons', (req, res) => {
    Dragon.find({}, (err, dragons) => {
      let dragonsArr = [];
      if (err) {
        return res.status(500).send(err.message);
      }
      if (dragons) {
        dragons.forEach(dragon => {
          dragonsArr.push(dragon);
        });
      }
      res.send(dragonsArr);
    });
  });
};
