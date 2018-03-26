// Dependencies
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
// Models
const Dinosaur = require('./models/Dinosaur');
const Dragon = require('./models/Dragon');

module.exports = function(app, config) {
  // Auth0 athentication middleware
  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${config.domain}/.well-known/jwks.json`
    }),
    audience: config.audience,
    issuer: `https://${config.domain}/`,
    algorithm: 'RS256'
  });

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
      }
      res.send(dinosArr);
    });
  });

  // GET protected dragons data, accessible only with token
  app.get('/dragons', jwtCheck, (req, res) => {
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
