require('dotenv').config();
const app = require('./app');
const sequelize = require('./database');
require('./models/userModel');
require('./models/blacklistModel');
require('./models/cohortModel');
require('./models/cohortUserModel');
require('./models/moodScoreModel');

(async () => {
  try {
      await sequelize.authenticate(); 
      console.log('Connexion à la base de données réussie.');
      // Decomment import + pass to true to init the db
      await sequelize.sync({ force: false });
      console.log('La base de données et les modèles sont synchronisés.');
  } catch (error) {
      console.error('Erreur lors de la synchronisation :', error);
  } 
})();

const PORT = process.env.PORT || 3650;

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});