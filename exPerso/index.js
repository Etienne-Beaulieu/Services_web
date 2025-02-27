import express from 'express';
import dotenv from 'dotenv';

// Importer le fichier de router du fichier professeurs.route
import router from './src/routes/users.route.js';

dotenv.config();

const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use('/api', router);

app.get('/', (req, res) => {
    res.send("<h1>Bienvenue a mon api!</h1>");
});

app.listen(port, hostname, () => {
    console.log(`Le serveur est lancé à l'adresse http://${hostname}:${port}/`);
});