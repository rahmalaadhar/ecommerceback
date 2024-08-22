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
//code et formule de la pagination 

router.get('/art/pagination', async(req, res) => {
    //filtre pour le bouton search
    const filtre = req.query.filtre || "";
    const page = parseInt(req.query.page);
    //pagezize c'est le nb d'article par page exp(page1 contient le 5 premier art,page2 contient du 6 au 10)
    const pageSize = parseInt(req.query.pageSize);
    // Calculate the start and end indexes for the requested page
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    //exec pour executer et populate pour afficher tous les attributs de la classe categorie
    const articles = await Article.find({ designation: { $regex: filtre, $options:
        "i"}}, null, {sort: {'_id': -1}}).populate("scategorieID").exec()
    // Slice(pour trancher une partie du tab et l'afficher dans un nv tab) the products array based on the indexes
    const paginatedProducts = articles.slice(startIndex, endIndex);
    // Calculate the total number of pages
    //math.ceil fait l'arrondissement superieur du valeur
    const totalPages = Math.ceil(articles.length / pageSize);
    // Send the paginated products and total pages as the API response
    res.json({ products: paginatedProducts, totalPages });
    });
    

module.exports = router