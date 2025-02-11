require('dotenv').config();
const express = require('express');
const professeurs = require('./professeurs');

const app = express();
const PORT = process.env.PORT || 3000;

// Route principale "/"
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bienvenue à mon premier API</h1>');
});

// Route "/professeurs"
app.get('/professeurs', (req, res) => {
    const code = req.query.code;

    res.setHeader('Content-Type', 'text/html');

    if (code && professeurs[code]) {
        const { prenom, nom } = professeurs[code];
        res.status(200).send(`<h1>Bonjour ${prenom} ${nom}</h1>`);
    } else {
        res.status(404).send('<h1>Professeur non trouvé, vous devez fournir un code de professeur valide</h1>');
    }
});

// Route "/professeurs/tous"
app.get('/professeurs/tous', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(professeurs);
});

// Gestion des routes non définies
app.use((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({ message: "Erreur 404 : La route demandée n'existe pas." });
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
