const app = require('./app');
const database = require('./database');

const PORT = process.env.PORT || 3650;

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});