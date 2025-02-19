import express from 'express';
import { getAllPokemons, getPokemonById, addPokemon, modifyPokemon, removePokemon } from '../controllers/pokemons.controller.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: "Bienvenue sur l'API de Pokemon!" });
});

router.get('/liste', getAllPokemons);

router.get('/:id', getPokemonById);

router.post('/', addPokemon);

router.put('/:id', modifyPokemon);

router.delete('/:id', removePokemon);

export default router;