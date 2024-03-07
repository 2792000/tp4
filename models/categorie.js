const mongoose = require('mongoose');

// Schéma pour la catégorie
const categorieSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

// Modèle de catégorie basé sur le schéma
const Categorie = mongoose.model('Categorie', categorieSchema);

module.exports = Categorie;
