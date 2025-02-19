import express from 'express';
import dotenv from 'dotenv';

// Importer le fichier de router du fichier professeurs.route
import router from './src/routes/pokemons.route.js';

const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;

dotenv.config();

// Créer une application express
const app = express();

// Importer les middlewares
app.use(express.json());

app.get('/', (req, res) => {
    res.send("<h1>Etienne Beaulieu</h1>");
});

app.get('/api', (req, res) => {
    res.send("<h1>Bienvenue sur l'API de Pokemon!</h1>");
});

app.use('/api/pokemons', router);

// Démarrer le serveur
app.listen(port, hostname, () => {
    console.log(`Le serveur est lancé à l'adresse http://${hostname}:${port}/`);
});
