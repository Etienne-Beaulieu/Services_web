const salutations = [
    { code_langue: "fr", langue: "Français", message: "Bonjour le monde" },
    { code_langue: "fr", langue: "Français", message: "Bon matin" },
    { code_langue: "fr", langue: "Français", message: "Salut" },
    { code_langue: "fr", langue: "Français", message: "Bonne nuit je vais travailler" },
    { code_langue: "en", langue: "Anglais", message: "Hello world" },
    { code_langue: "en", langue: "Anglais", message: "Good morning" },
    { code_langue: "en", langue: "Anglais", message: "Hi" },
    { code_langue: "en", langue: "Anglais", message: "Good night, I'm going to work" },
    { code_langue: "es", langue: "Espagnol", message: "Hola Mundo" },
    { code_langue: "es", langue: "Espagnol", message: "Buenos dias" },
    { code_langue: "es", langue: "Espagnol", message: "Hola" },
    { code_langue: "es", langue: "Espagnol", message: "Buenas noches me voy a trabajar" },
    { code_langue: "de", langue: "Allemand", message: "Hallo Welt" },
    { code_langue: "de", langue: "Allemand", message: "Guten Morgen" },
    { code_langue: "de", langue: "Allemand", message: "Hallo" },
    { code_langue: "de", langue: "Allemand", message: "Gute Nacht, ich gehe zur Arbeit" }
];

// Fonction pour ajouter une salutation
const ajouterSalutation = (code_langue, langue, message) => {
    const nouvelleSalutation = { code_langue, langue, message };
    salutations.push(nouvelleSalutation);
    return nouvelleSalutation;
};

export { salutations, ajouterSalutation };
