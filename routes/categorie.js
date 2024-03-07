const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate')
const Categorie = require('../models/categorie');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

// Route pour ajouter une nouvelle catégorie
router.post('/add', async (req, res) => {
    try {
        const { nom, description } = req.body;
        const categorie = new Categorie({ nom, description });
        await categorie.save();
        res.redirect('/categories/liste'); // Redirection vers la liste des catégories
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Route pour afficher le formulaire d'ajout de catégorie
router.get('/add', async (req, res) => {
    res.render('addCategorie');
})

// Route pour afficher la liste des catégories
router.get('/liste', async (req, res) => {
    try {
        const categories = await Categorie.find();
        res.render('listeCategories', { categories: categories });
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération des catégories');
    }
});

// Route pour afficher le formulaire de modification d'une catégorie
router.get('/edit/:id', async (req, res) => {
    try {
        const categorie = await Categorie.findById(req.params.id);
        res.render('editCategorie', { categorie: categorie }); // Utilisation de "categorie" au lieu de "categories"
    } catch (error) {
        res.status(404).send('Catégorie non trouvée');
    }
});

// Route pour modifier une catégorie existante
router.put('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, description } = req.body;
        const updatedCategorie = await Categorie.findByIdAndUpdate(id, { nom, description }, { new: true });
        res.redirect('/categories/liste'); // Redirection vers la liste des catégories après modification
    } catch (error) {
        res.status(400).send(error.message);
    }
});
// Route pour modifier une catégorie existante
router.post('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, description } = req.body;
        const updatedCategorie = await Categorie.findByIdAndUpdate(id, { nom, description }, { new: true });
        res.redirect('/categorie/liste'); // Redirige après la modification
    } catch (error) {
        res.status(400).send(error.message);
    }
});
// Route pour supprimer une catégorie

router.post('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Categorie.findByIdAndDelete(id);
        res.redirect('/categorie/liste'); // Redirige après la suppression
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Categorie.findByIdAndDelete(id);
        res.send('Catégorie supprimée avec succès');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
