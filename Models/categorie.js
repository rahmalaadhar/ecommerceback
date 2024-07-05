//le model  interagit avec le mongoose qui a son tour interagit avec mongodb
const mongoose =require("mongoose")
//schema pour rendre les categories de mm structure
const categorieSchema=mongoose.Schema({
nomcategorie:{ type: String, required: true,unique:true },
imagecategorie :{ type: String, required: false }
})
//on doit l'exporter pour que le controller l'importe
module.exports=mongoose.model('Categorie',categorieSchema)