import express from 'express';
import { getAllPokemons, getPokemonById } from '../src/controllers/pokemons.controller.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: "Bienvenue sur l'API de Pokemon!" });
});

router.get('/liste', getAllPokemons);

router.get('/:id', getPokemonById);

export default router;
