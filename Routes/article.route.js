const express = require('express');
const router = express.Router();
// Créer une instance d'article.
const Article = require('../Models/article');
// afficher la liste des articles.
router.get('/', async (req, res,) => {
    try {
        //sort pour les classer selon l'ordre decroissant
        //populate pour afficher tous les attributs de la classe scategorie
        const art = await Article.find({}, null, { sort: { '_id': -1 } }).populate("scategorieID")
        res.status(200).json(art)
    } catch (error) {
        res.status(404).json({ message: error.message })

    }
});


// créer un nouveau article
router.post('/', async (req, res) => {
    const art = new Article(req.body)
    try {
        await art.save()
        res.status(200).json(art)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

})
// chercher un article
router.get('/:articleId', async (req, res) => {
    try {
        const art = await Article.findById(req.params.articleId)
        res.status(200).json(art)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
});
// modifier un article
router.put('/:articleId', async (req, res) => {
    try {
        const art = await Article.findByIdAndUpdate(req.params.articleId, { $set: req.body }, { new: true })

        res.status(200).json(art)


    } catch (error) {
        res.status(404).json({ message: error.message })
    }
});

// Supprimer un article
router.delete('/:articleId', async (req, res) => {
    //req.params ca veut dire le parametre dans le request (articleId)
    try {
        const id = req.params.articleId
        await Article.findByIdAndDelete(id)
        res.status(200).json({ message: "article deleted successfully" })
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
});

module.exports = router