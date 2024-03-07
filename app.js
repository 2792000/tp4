const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/posts')
const catRoutes = require('./routes/categorie')
produitRoutes= require('./routes/produit')
const swaggerDoc = require('./swagger')
dotenv.config()
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 5000

//console.log(MONGODB_URI)
const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/auth',authRoutes)
app.use('/posts',postRoutes)
app.use('/categorie',catRoutes)
app.use('/produit',produitRoutes)
app.use('/api-docs',swaggerDoc.serve,swaggerDoc.setup)




app.get('/',(req,res)=>{
   
    res.render('login')
})
app.get('/register', (req, res) => {
    res.render('register');
});
// connection to mongodb and start server 
mongoose.connect(MONGODB_URI).then(()=>{
    console.log('connected to MongoDb');
    app.listen(PORT,()=>{
        console.log(`server listening on ${PORT}`)
    })
}).catch((err) =>{
    console.error('Error connecting to mongodb:',err.message)
})

module.exports = app;