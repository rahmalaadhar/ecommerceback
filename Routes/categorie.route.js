const express = require('express');
const router = express.Router();
// Créer une instance de categorie.
const Categorie = require('../Models/categorie');
const { verifyToken } = require('../Middleware/verif-token');
const { authorizeRoles } = require('../Middleware/authorizeRoles');
// afficher la liste des categories.
router.get('/',verifyToken,authorizeRoles("user","admin"), async (req, res, )=> {
    try{
        //sort pour les classer selon l'ordre decroissant
    const cat=await Categorie.find({},null,{sort: {'_id': -1}})
    res.status(200).json(cat)
}catch(error){
    res.status(404).json({ message: error.message })

}
});


// créer un nouvelle catégorie
router.post('/', async (req, res) => { 
const Cat1 = new Categorie(req.body)
try {
await Cat1.save()
res.status(200).json(Cat1 )
} catch (error) {
res.status(404).json({ message: error.message })}

})
// chercher une catégorie
router.get('/:categorieId',async(req, res)=>{
    try{
        const cat=await Categorie.findById(req.params.categorieId)
res.status(200).json(cat)
    }catch(error){
        res.status(404).json({ message: error.message })
    }
});
// modifier une catégorie
router.put('/:categorieId', async (req, res)=> {
    try{
        const cat=await Categorie.findByIdAndUpdate(req.params.categorieId,{$set:req.body},{ new: true })

res.status(200).json(cat)


    }catch(error){
res.status(404).json({ message: error.message })
    }
});

// Supprimer une catégorie
router.delete('/:categorieId', async (req, res)=> {
    //req.params ca veut dire le parametre dans le request (categorieId)
   try{
    const id =req.params.categorieId
    await Categorie.findByIdAndDelete(id)
res.status(200).json({message:"categorie deleted successfully"})}
catch(error){
    res.status(404).json({ message: error.message })
}
});

module.exports=router