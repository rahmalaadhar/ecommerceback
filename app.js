//importer les packages installés
const express=require ("express")
const dotenv=require("dotenv")
const mongoose=require ('mongoose')
const CategorieRouter=require("./Routes/categorie.route")
const ScategorieRouter=require("./Routes/scategorie.route")
const ArticleRouter=require("./Routes/article.route")
//instance de la classe express
const app=express()
//configuration du fichier .env
dotenv.config()
//bodyparser middelware
app.use (express.json())
//requete 
app.get("/",(req,res)=>{
    res.send("bienvenue dans notre site");
})
// Connexion à la base données
mongoose.connect(process.env.DATABASECLOUD)
.then(() => {console.log("DataBase Successfully Connected");})
.catch(err => { console.log("Unable to connect to database", err);
process.exit(); })

app.use("/api/categorie",CategorieRouter)
app.use("/api/scategorie",ScategorieRouter)
app.use("/api/article", ArticleRouter)
//on ecrit process.env.PORT pour ne pas mettre le port, si on veut changer 
//sera facile dans le fichier .env seulement et pas dans le code
app.listen(process.env.PORT)
    console.log(`application run at port ${process.env.PORT}`)
    //console.log("application run at port" +process.env.PORT)
    module.exports = app


