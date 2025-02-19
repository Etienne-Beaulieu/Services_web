import db from '../config/db.js';

// Fonction pour récupérer toutes les salutations depuis la base de données
const getAll = () => {
    return new Promise((resolve, reject) => {
        const requete = `SELECT * FROM pokemon`;

        db.query(requete, (erreur, resultat) => {
            if (erreur) {
                console.error(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            resolve(resultat); // Retourne la liste des salutations
        });
    });
};

const getId = (id) => {
    return new Promise((resolve, reject) => {

        const requete = `SELECT * FROM pokemon WHERE id = ?`;
        const params = [id]

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat);
        });
    });
};

// Fonction pour créer un nouveau Pokémon
const createPokemon = (pokemon) => {
    return new Promise((resolve, reject) => {
        const requete = `
            INSERT INTO pokemon (nom, type_primaire, type_secondaire, pv, attaque, defense)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const params = [
            pokemon.nom,
            pokemon.type_primaire,
            pokemon.type_secondaire,
            pokemon.pv,
            pokemon.attaque,
            pokemon.defense
        ];

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // Rejette l'erreur pour qu'elle soit capturée dans le contrôleur
                reject(erreur);
            } else {
                // Renvoie le nouveau Pokémon avec son ID généré
                const nouveauPokemon = {
                    id: resultat.insertId,
                    ...pokemon
                };
                resolve(nouveauPokemon);
            }
        });
    });
};

const updatePokemon = (id, pokemon) => {
    return new Promise((resolve, reject) => {
        const requete = `
            UPDATE pokemon
            SET nom = ?, type_primaire = ?, type_secondaire = ?, pv = ?, attaque = ?, defense = ?
            WHERE id = ?
        `;
        const params = [
            pokemon.nom,
            pokemon.type_primaire,
            pokemon.type_secondaire,
            pokemon.pv,
            pokemon.attaque,
            pokemon.defense,
            id
        ];

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                reject(erreur);
            } else {
                // Renvoie le Pokémon mis à jour
                const pokemonModifie = {
                    id: Number(id),
                    ...pokemon
                };
                resolve(pokemonModifie);
            }
        });
    });
};

// Fonction pour supprimer un Pokémon
const deletePokemon = (id) => {
    return new Promise((resolve, reject) => {
        const requete = `DELETE FROM pokemon WHERE id = ?`;
        const params = [id];

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                reject(erreur);
            } else {
                // Renvoie le Pokémon supprimé (simulé ici, car il n'est plus dans la base de données)
                const pokemonSupprime = {
                    id: Number(id),
                    ...resultat // Inclut les informations du Pokémon supprimé si disponibles
                };
                resolve(pokemonSupprime);
            }
        });
    });
};

export {getAll, getId, createPokemon, updatePokemon, deletePokemon};