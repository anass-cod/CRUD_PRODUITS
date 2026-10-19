let express = require('express')
let app = express()
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        res.setHeader("Access-Control-Allow-Headers", "Content-Type")
    }
    next()

})
let { router } = require("./Router/produitsRouter")
app.use('/produits', router)
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0" , () => {
    console.log("bien")
});