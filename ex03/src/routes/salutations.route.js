// Nous avons besoin d'importer le module express pour utiliser le Router
import express from 'express';

import { salutations } from '../models/salutations.model.js'; // Vérifiez bien le chemin

import { getSalutationAleatoire, ajouterNouvelleSalutation } from '../controllers/salutations.controller.js';

// Nous créons un objet router qui va nous permettre de gérer les routes
const router = express.Router();    

router.get('/', (req, res) => {
    res.json({ message: "Bonjour depuis l'API de salutations!" });
});

// On utilise router au lieu de app
router.get('/salutations/liste', (req, res) => {
    res.json(salutations);
});

router.get('/salutations', getSalutationAleatoire);

router.get('/salutations?langue=[fr,en,es,de]', (req, res) => {
    const code = req.params.code;
    res.send(`Vous avez demandé le professeur avec le code ${code}`);
});

router.post('/salutations', ajouterNouvelleSalutation);

// On exporte le router pour pouvoir l'utiliser dans index.js
export default router;