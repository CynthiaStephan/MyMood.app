const express = require('express');
const app = express();

const PORT = process.env.PORT || 3650;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Test réussi !' });
  });

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});