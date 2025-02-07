// Importer le module express
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

// Créer une application express
const app = express();
const hostname = process.env.hostname;
const port = process.env.port;

app.get('/', (req, res) => {
    res.send("<h1>Mon premier serveur web sur express !</h1>");
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });