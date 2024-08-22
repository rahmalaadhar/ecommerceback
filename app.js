//importer les packages installés
const cors=require("cors")
const express=require ("express")
const dotenv=require("dotenv")
const mongoose=require ('mongoose')
const CategorieRouter=require("./Routes/categorie.route")
const ScategorieRouter=require("./Routes/scategorie.route")
const ArticleRouter=require("./Routes/article.route")
const paymentRouter =require("./Routes/payment.route.js")
const usersRouter=require("./Routes/user.route.js")
//instance de la classe express
const app=express()
//cors pour que le back peut comminiquer avec front vue que le port n'est pas le mm
app.use(cors({
    origin:"*"
}))
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
app.use('/api/payment', paymentRouter)
app.use('/api/users', usersRouter)
//on ecrit process.env.PORT pour ne pas mettre le port, si on veut changer 
//sera facile dans le fichier .env seulement et pas dans le code
app.listen(process.env.PORT)
    console.log(`application run at port ${process.env.PORT}`)
    //console.log("application run at port" +process.env.PORT)
    module.exports = app


