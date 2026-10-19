let express = require("express")
let router = express.Router()
let { getProduits, postProduit, removeProduit , putProduits} = require("../controller/produitsController")
router.get("/", getProduits)
router.post("/", postProduit)
router.delete("/", removeProduit)
router.put("/", putProduits)

module.exports = { router }