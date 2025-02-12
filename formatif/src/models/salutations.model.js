import db from '../config/db.js';

// Fonction pour récupérer toutes les salutations depuis la base de données
const getSalutations = () => {
    return new Promise((resolve, reject) => {
        const requete = `SELECT * FROM salutations`;

        db.query(requete, (erreur, resultat) => {
            if (erreur) {
                console.error(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            resolve(resultat); // Retourne la liste des salutations
        });
    });
};

// Fonction pour ajouter une nouvelle salutation en base de données
const ajouterSalutation = (code_langue, langue, message) => {
    return new Promise((resolve, reject) => {
        const requete = `INSERT INTO salutations (code_langue, langue, message) VALUES (?, ?, ?)`;
        const params = [code_langue, langue, message];

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.error(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            resolve({ id: resultat.insertId, code_langue, langue, message }); // Retourne la salutation insérée
        });
    });
};

export { getSalutations, ajouterSalutation };
