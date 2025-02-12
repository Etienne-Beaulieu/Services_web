import express from 'express';
import { getSalutationAleatoire, ajouterNouvelleSalutation } from '../controllers/salutations.controller.js';
import { getSalutations } from '../models/salutations.model.js'; // Importation correcte

const router = express.Router();    

// Route de test
router.get('/', (req, res) => {
    res.json({ message: "Bienvenue sur l'API de salutations!" });
});

// Route pour récupérer toutes les salutations
router.get('/salutations/liste', async (req, res) => {
    try {
        const salutations = await getSalutations();
        res.json(salutations);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des salutations", error: error.message });
    }
});

// Route pour récupérer une salutation aléatoire (avec ou sans langue)
router.get('/salutations', getSalutationAleatoire);

// Route pour ajouter une nouvelle salutation
router.post('/salutations', ajouterNouvelleSalutation);

export default router;
