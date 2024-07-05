const express = require('express');
const router = express.Router();
// Créer une instance de scategorie.
const Scategorie = require('../Models/scategorie');
// afficher la liste des scategories.
router.get('/', async (req, res, )=> {
    try{
        //sort pour les classer selon l'ordre decroissant
        //populate pour afficher tous les attributs de la classe categorie
    const scat=await Scategorie.find({},null,{sort: {'_id': -1}}).populate("categorieID")
    res.status(200).json(scat)
}catch(error){
    res.status(404).json({ message: error.message })

}
});


// créer un nouvelle scatégorie
router.post('/', async (req, res) => { 
const scat = new Scategorie(req.body)
try {
await scat.save()
res.status(200).json(scat )
} catch (error) {
res.status(404).json({ message: error.message })}

})
// chercher une scatégorie
router.get('/:scategorieId',async(req, res)=>{
    try{
        const scat=await Scategorie.findById(req.params.scategorieId)
res.status(200).json(scat)
    }catch(error){
        res.status(404).json({ message: error.message })
    }
});
// modifier une scatégorie
router.put('/:scategorieId', async (req, res)=> {
    try{
        const scat=await Scategorie.findByIdAndUpdate(req.params.scategorieId,{$set:req.body},{ new: true })

res.status(200).json(scat)


    }catch(error){
res.status(404).json({ message: error.message })
    }
});

// Supprimer une scatégorie
router.delete('/:scategorieId', async (req, res)=> {
    //req.params ca veut dire le parametre dans le request (scategorieId)
   try{
    const id =req.params.scategorieId
    await Scategorie.findByIdAndDelete(id)
res.status(200).json({message:"scategorie deleted successfully"})}
catch(error){
    res.status(404).json({ message: error.message })
}
});

module.exports=router