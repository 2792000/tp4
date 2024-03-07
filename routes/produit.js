//create router add produit
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');
const Produit = require('../models/produit');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/liste', async (req, res) => {
    try {
        const produits = await Produit.find();
        res.render('listeProduits', { produits: produits });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/addP',async (req,res)=>{
    try {
    
        const {code,title,detail}=req.body;
        const produit = new Produit({code,title,detail});
        await produit.save();
        res.status(201).redirect('liste');
    } catch (error) {
        res.status(400).send(error.message)
    }
})


router.get('/addP',(req,res)=>{
    
    res.render('addProduit')
})

// Route pour afficher le formulaire de modification d'un produit
router.get('/edit/:id', async (req, res) => {
    try {
        const produit = await Produit.findById(req.params.id);
        res.render('editProduit', { produit: produit });
    } catch (error) {
        res.status(404).send('Produit non trouvé');
    }
});

// Route pour mettre à jour un produit
router.put('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, detail } = req.body;
        const updatedProduit = await Produit.findByIdAndUpdate(id, { title, detail }, { new: true });
        res.redirect('/produit/liste');
    } catch (error) {
        res.status(400).send(error.message);
    }
});


// Route pour mettre à jour un produit
router.post('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, detail } = req.body;
        const updatedProduit = await Produit.findByIdAndUpdate(id, { title, detail }, { new: true });
        res.redirect('/produit/liste');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Route pour supprimer un produit
router.post('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Produit.findByIdAndDelete(id);
        res.redirect('/produit/liste');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Route pour supprimer un produit
router.delete('/delete/:id', async (req, res) => {
    try {
        await Produit.findByIdAndDelete(req.params.id);
        res.redirect('/produit/liste');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        await Produit.findByIdAndDelete(req.params.id);
        res.redirect('/produit/liste');
    } catch (error) {
        res.status(400).send(error.message);
    }
});
module.exports = router;