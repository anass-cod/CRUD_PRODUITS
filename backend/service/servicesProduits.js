require("dotenv").config()
const { ObjectId } = require("mongodb");
let { MongoClient } = require("mongodb")
let client = new MongoClient(process.env.MONGO_URI)

async function connect() {
    try {
        await client.connect()
        let shop = client.db("shop")
        let produits = shop.collection("Produits")
        return { status: "Connect", produits: produits }
    } catch (error) {
        return { status: "Error", produits: undefined }
    }
}

let findProduits = async (id) => {

    try {
        let ObjectReturn = await connect()

        if (ObjectReturn.status != "Error") {
            let produits = ObjectReturn.produits
            if (!id) {
                let findProduits = await produits.find().toArray()
                return findProduits
            } else {
                let produit = await produits.findOne({ _id: new ObjectId(id) })
                return produit
            }
        }
        else {
            return 500
        }
    } catch (err) {
        return 500
    }
}
let insertProduit = async (object) => {
    try {
        let ObjectReturn = await connect()
        if (ObjectReturn.status != "Error") {
            let produits = ObjectReturn.produits
            let response = await produits.insertOne(object)
            if (response.acknowledged) {
                return 200
            } else {
                return 500
            }
        }
    } catch (err) {
        return 500
    }

}
let deleteProduit = async (id) => {
    try {
        let ObjectReturn = await connect()
        if (ObjectReturn.status != "Error") {
            let Produits = ObjectReturn.produits
            let response = await Produits.deleteOne({ _id: new ObjectId(id) })
            if (response.deletedCount > 0) {
                return 200
            } else {
                return 500
            }
        }
    } catch (err) {
        return 500
    }
}
let updateProduit = async (id, dataUpdate) => {
    try {
        let objectReturn = await connect()
        if (objectReturn.status != "Error") {
            let Produits = objectReturn.produits
            let response = Produits.updateOne({ _id: new ObjectId(id) }, { $set: dataUpdate })
            return 200
        }
    } catch (error) {
        console.log(error)
        return 500
    }
}
module.exports = { findProduits, insertProduit, deleteProduit, updateProduit }