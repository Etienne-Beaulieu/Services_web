import { getAll, getId, createPokemon, updatePokemon, deletePokemon } from '../models/pokemons.model.js';

export const getAllPokemons = async (req, res) => {
    const { page = 1, type = '' } = req.query; // Récupère les paramètres de la requête
    const pokemonsParPage = 25; // Nombre de Pokémon par page

    try {
        // Récupère tous les Pokémon depuis la base de données
        let pokemons = await getAll();

        // Filtre les Pokémon par type primaire si le paramètre `type` est fourni
        if (type) {
            pokemons = pokemons.filter(pokemon => pokemon.type_primaire.toLowerCase() === type.toLowerCase());
        }

        // Calcule les informations de pagination
        const nombrePokemonTotal = pokemons.length;
        const totalPage = Math.ceil(nombrePokemonTotal / pokemonsParPage);
        const pageCourante = Math.max(1, Math.min(Number(page), totalPage)); // Assure que la page est valide

        // Pagine les résultats
        const debut = (pageCourante - 1) * pokemonsParPage;
        const fin = debut + pokemonsParPage;
        const pokemonsPagination = pokemons.slice(debut, fin);

        // Renvoie la réponse JSON
        res.status(200).json({
            pokemons: pokemonsPagination.map(pokemon => ({
                nom: pokemon.nom,
                type_primaire: pokemon.type_primaire,
                type_secondaire: pokemon.type_secondaire,
                pv: pokemon.pv,
                attaque: pokemon.attaque,
                defense: pokemon.defense
            })),
            type: type || "",
            nombrePokemonTotal,
            page: pageCourante,
            totalPage
        });
    } catch (error) {
        // En cas d'erreur SQL, log l'erreur et renvoie une erreur 500
        console.error(`Erreur SQL - Code: ${error.code}, Message: ${error.sqlMessage}`);
        res.status(500).json({ erreur: "Echec lors de la récupération de la liste des pokemons" });
    }
};

export const getPokemonById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Recherche du pokemon avec le ID: ${id}`);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID invalide' });
        }

        const pokemons = await getId(id);

        if (pokemons.length === 0) {
            return res.status(404).json({ error: 'Pokemon introuvable avec l\'id ' + id });
        }

        const pokemon = pokemons[0];
        res.status(200).json({
            nom: pokemon.nom,
            type_primaire: pokemon.type_primaire,
            type_secondaire: pokemon.type_secondaire,
            pv: pokemon.pv,
            attaque: pokemon.attaque,
            defense: pokemon.defense
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};

export const addPokemon = async (req, res) => {
    const { nom, type_primaire, type_secondaire, pv, attaque, defense } = req.body;

    // Vérifie que tous les champs obligatoires sont présents
    const champsObligatoires = ['nom', 'type_primaire', 'pv', 'attaque', 'defense'];
    const champsManquants = champsObligatoires.filter(champ => !req.body[champ]);

    if (champsManquants.length > 0) {
        return res.status(400).json({
            erreur: "Le format des données est invalide",
            champ_manquant: champsManquants
        });
    }

    try {
        // Insère le nouveau Pokémon dans la base de données
        const nouveauPokemon = await createPokemon({
            nom,
            type_primaire,
            type_secondaire: type_secondaire || null, // Si type_secondaire est absent, utilise null
            pv,
            attaque,
            defense
        });

        // Renvoie une réponse de succès avec le nouveau Pokémon
        res.status(201).json({
            message: `Le pokemon ${nom} a été ajouté avec succès`,
            pokemon: nouveauPokemon
        });
    } catch (error) {
        // En cas d'erreur SQL, log l'erreur et renvoie une erreur 500
        console.error(`Erreur SQL - Code: ${error.code}, Message: ${error.sqlMessage}`);
        res.status(500).json({ erreur: `Echec lors de la création du pokemon ${nom}` });
    }
};

export const modifyPokemon = async (req, res) => {
    const { id } = req.params;
    const { nom, type_primaire, type_secondaire, pv, attaque, defense } = req.body;

    // Vérifie que tous les champs obligatoires sont présents
    const champsObligatoires = ['nom', 'type_primaire', 'pv', 'attaque', 'defense'];
    const champsManquants = champsObligatoires.filter(champ => !req.body[champ]);

    if (champsManquants.length > 0) {
        return res.status(400).json({
            erreur: "Le format des données est invalide",
            champ_manquant: champsManquants
        });
    }

    try {
        // Vérifie si le Pokémon existe
        const pokemonExistant = await getId(id);

        if (pokemonExistant.length === 0) {
            return res.status(404).json({
                erreur: `Le pokemon id ${id} n'existe pas dans la base de données`
            });
        }

        // Met à jour le Pokémon dans la base de données
        const pokemonModifie = await updatePokemon(id, {
            nom,
            type_primaire,
            type_secondaire: type_secondaire || null, // Si type_secondaire est absent, utilise null
            pv,
            attaque,
            defense
        });

        // Renvoie une réponse de succès avec le Pokémon mis à jour
        res.status(200).json({
            message: `Le pokemon id ${id} a été modifié avec succès`,
            pokemon: pokemonModifie
        });
    } catch (error) {
        // En cas d'erreur SQL, log l'erreur et renvoie une erreur 500
        console.error(`Erreur SQL - Code: ${error.code}, Message: ${error.sqlMessage}`);
        res.status(500).json({ erreur: `Echec lors de la modification du pokemon ${nom}` });
    }
};

export const removePokemon = async (req, res) => {
    const { id } = req.params;

    try {
        // Vérifie si le Pokémon existe
        const pokemonExistant = await getId(id);

        if (pokemonExistant.length === 0) {
            return res.status(404).json({
                erreur: `Le pokemon id ${id} n'existe pas dans la base de données`
            });
        }

        // Supprime le Pokémon de la base de données
        const pokemonSupprime = await deletePokemon(id);

        // Renvoie une réponse de succès avec le Pokémon supprimé
        res.status(200).json({
            message: `Le pokemon id ${id} a été supprimé avec succès`,
            pokemon: pokemonSupprime
        });
    } catch (error) {
        // En cas d'erreur SQL, log l'erreur et renvoie une erreur 500
        console.error(`Erreur SQL - Code: ${error.code}, Message: ${error.sqlMessage}`);
        res.status(500).json({ erreur: `Echec lors de la suppression du pokemon id ${id}` });
    }
};