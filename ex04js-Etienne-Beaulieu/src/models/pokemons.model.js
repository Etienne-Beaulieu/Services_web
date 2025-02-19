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

export {getAll, getId};