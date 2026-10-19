let { findProduits, insertProduit, deleteProduit , updateProduit } = require("../service/servicesProduits")
let getProduits = async (req, res) => {
    let id = req.query.id
    let data = await findProduits(id)
    if (data != 500) {
        res.status(200).send(data)
    } else {
        res.status(500).send("Error")
    }
}
let postProduit = async (req, res) => {
    let object = req.body
    let result = await insertProduit(object)
    if (result === 200) {
        res.status(200).send("Produit ajouté avec succès !")
    } else {
        res.status(500).send("Error")
    }
}
let removeProduit = async (req, res) => {
    let idProuits = req.query.id
    let result = await deleteProduit(idProuits)
    if (result === 200) {
        res.status(200).send("Produit supprimé avec succès !")
    } else {
        res.status(500).send("Une erreur est survenue lors de la suppression du produit. Veuillez réessayer.")
    }
}
let putProduits = async (req, res) => {
    let idproduitUpdate = req.query.id
    let dataUpdate = req.body
    let result = await updateProduit(idproduitUpdate , dataUpdate)
    if(result === 200){
        res.status(200).send("Produit modifié avec succès !")
    }else {
       res.status(500).send("Une erreur est survenue lors de la modification du produit. Veuillez réessayer.") 
    }
}
module.exports = { getProduits, postProduit, removeProduit, putProduits }