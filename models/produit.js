//create model of post Document
const mongoose = require('mongoose');
const produitSchema = new mongoose.Schema({
    code:String,
    title:String,
    detail:String,
})

const Produit = mongoose.model('Produit',produitSchema)

module.exports = Produit;