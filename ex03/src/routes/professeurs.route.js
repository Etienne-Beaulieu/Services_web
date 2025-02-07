// Nous avons besoin d'importer le module express pour utiliser le Router
import express from 'express';
// Nous créons un objet router qui va nous permettre de gérer les routes
const router = express.Router();    

// On utilise router au lieu de app
router.get('/tous', (req, res) => {
    res.send(`Vous avez demandé tous les professeurs.`);
});

router.get('/:code', (req, res) => {
    const code = req.params.code;
    res.send(`Vous avez demandé le professeur avec le code ${code}`);
});

// On exporte le router pour pouvoir l'utiliser dans index.js
export default router;