import { getAll, getId } from '../models/pokemons.model.js';

export const getAllPokemons = async (req, res) => {
    try {
        const pokemons = await getAll();
        res.json(pokemons);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};

export const getPokemonById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Fetching Pokemon with ID: ${id}`);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID invalide' });
        }

        const pokemons = await getId(id);

        if (pokemons.length === 0) {
            return res.status(404).json({ error: 'Pokemon non trouvé' });
        }

        res.json(pokemons[0]);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};