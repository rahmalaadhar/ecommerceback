const mongoose =require("mongoose")
//ref=reference au modele categorie

const scategorieSchema=mongoose.Schema({
nomscategorie:{ type: String, required: true },
imagescat :{ type: String, required: false },
categorieID: {type:mongoose.Schema.Types.ObjectId,
ref:'Categorie'}
})
module.exports=mongoose.model('Scategorie',scategorieSchema)