import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

// Importer le fichier de router du fichier professeurs.route
import router from './src/routes/salutations.route.js';

dotenv.config();

const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// 📌 Chemin du fichier access.log
const logStream = fs.createWriteStream(path.join('./access.log'), { flags: 'a' });

// 📌 Format personnalisé pour Morgan
morgan.token('clf-date', () => new Date().toISOString().replace('T', ' ').split('.')[0] + " +0000");

app.use(morgan(':clf-date => :method :url :status - :response-time ms', { stream: logStream }));

app.use('/api', router);

app.get('/', (req, res) => {
    res.send("<h1>Bienvenue a mon api de salutations!</h1>");
});

app.listen(port, hostname, () => {
    console.log(`Le serveur est lancé à l'adresse http://${hostname}:${port}/`);
});