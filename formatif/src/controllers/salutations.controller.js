import { getSalutations, ajouterSalutation } from '../models/salutations.model.js';

// Fonction pour ajouter une nouvelle salutation
export const ajouterNouvelleSalutation = async (req, res) => {
    const { code_langue, langue, message } = req.body;

    // Vérifier que tous les champs sont présents
    if (!code_langue || !langue || !message) {
        return res.status(400).json({
            message: "Erreur, les paramètres code_langue, langue et message sont obligatoires"
        });
    }

    try {
        // Ajouter la nouvelle salutation en base de données
        const nouvelleSalutation = await ajouterSalutation(code_langue, langue, message);
        return res.status(201).json({
            message: "Salutation ajoutée",
            salutation: nouvelleSalutation
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erreur lors de l'ajout de la salutation",
            error: error.message
        });
    }
};

// Fonction pour récupérer une salutation aléatoire
export const getSalutationAleatoire = async (req, res) => {
    try {
        // Récupérer toutes les salutations depuis la base de données
        const salutations = await getSalutations();

        // Vérifier si un paramètre "langue" est fourni
        if (req.query.langue) {
            const codeLangue = req.query.langue.toLowerCase(); // Normaliser en minuscule

            // Filtrer les salutations par langue
            const salutationsFiltrees = salutations.filter(s => s.code_langue === codeLangue);

            if (salutationsFiltrees.length === 0) {
                return res.status(404).json({
                    message: `Erreur, le code de langue ${codeLangue} n'existe pas`
                });
            }

            // Sélectionner une salutation aléatoire
            const salutationAleatoire = salutationsFiltrees[Math.floor(Math.random() * salutationsFiltrees.length)];
            return res.json(salutationAleatoire);
        }

        // Si aucune langue n'est spécifiée, choisir une salutation aléatoire parmi toutes
        if (salutations.length === 0) {
            return res.status(404).json({
                message: "Aucune salutation disponible"
            });
        }

        const salutationAleatoire = salutations[Math.floor(Math.random() * salutations.length)];
        return res.json(salutationAleatoire);
    } catch (error) {
        return res.status(500).json({
            message: "Erreur lors de la récupération des salutations",
            error: error.message
        });
    }
};
