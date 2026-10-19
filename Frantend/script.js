
let message = document.getElementById("message")
let table = document.getElementById("table");
let name = document.getElementById("name")
let price = document.getElementById("price")
let categorie = document.getElementById("categorie")
let addModifier = document.getElementById("addModifier")
let idproduitModier = ""
let mode = "create"
async function addModifierProduits(idProduitModifier) {

    if (name.value != "" && categorie.value != "") {
        document.getElementById("messageForm").style.display = "none"

        let Total = (+price.value === 0 || price.value.trim() === "") ? "gratuit" : +price.value
        let object = {
            name: name.value,
            price: Total,
            category: categorie.value
        }
        if (mode === "create") {

            message.innerHTML = "Ajout du produit en cours..."
            addActive()
            try {
                let response = await fetch("http://localhost:3000/produits", {
                    method: "POST",
                    body: JSON.stringify(object),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                let result = await response.text()
                message.classList.remove("active")
                if (!response.ok) {
                    throw new Error(result)
                }
                message.innerHTML = result
                clearInput()
                start()
            } catch (err) {
                message.innerHTML = "Une erreur est survenue lors de l’ajout du produit. Veuillez réessayer."
            }
        } else {
            try {
                let response = await fetch(`http://localhost:3000/produits?id=${idproduitModier}`, {
                    method: "PUT",
                    body: JSON.stringify(object),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (!response.ok) {
                    throw new Error("err")
                }
                let result = await response.text()
                message.innerHTML = result
                addModifier.innerHTML = '<i class="fa-solid fa-plus"></i>  Ajoute'
                mode = "create"
                clearInput()
                start()

            } catch (error) {
                message.innerHTML = "Une erreur est survenue lors de la modification du produit. Veuillez réessayer."
            }

        }
        addActive()
        removeActive()
    } else {
        document.getElementById("messageForm").style.display = "block"
    }


}
async function getdata() {
    try {
        table.innerHTML = `
                 <tr>
                <td colspan="4">
                    <div class="loading-container">
                        <span class="loader"></span>
                        <p>Chargement des produits...</p>
                    </div>
                </td>
            </tr>
    `
        let response = await fetch("http://localhost:3000/produits");

        if (!response.ok) {
            throw new Error("Une erreur est survenue lors du chargement des produits. Veuillez réessayer");
        }

        let produits = await response.json();
        return produits
    } catch (err) {
        return "Error"
    }
}

async function start() {
    let data = await getdata()
    read(data)
}
start()
async function read(produits) {
    try {

        table.innerHTML = "";
        if (produits === "Error") {
            throw new Error("error")
        }
        if (produits.length === 0) {
            table.innerHTML = `
                <tr>
                    <td colspan="6">Aucun produit trouvé.</td>
                </tr>
            `
        }
        for (let i = 0; i < produits.length; i++) {
            table.innerHTML += `
                <tr>
                    <td>${produits[i].name}</td>
                    <td ${produits[i].price === "gratuit" ? "style='color:red;'" : ""}>${produits[i].price}</td>
                    <td>${produits[i].category}</td>
                    <td>
                        <button class="update-btn" onclick="update('${produits[i]._id}')">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>

                        <button class="delete-btn" onclick="remove('${produits[i]._id}')">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                </tr>
            `;
        }
    } catch (error) {
        message.innerHTML = "Une erreur est survenue lors du chargement des produits. Veuillez réessayer"
        addActive()
        removeActive()
        table.innerHTML = `
            <tr>
                <td colspan="6">
                    Une erreur est survenue lors du chargement des produits. Veuillez réessayer
                </td>
            </tr>
        `
    }


}

function removeActive() {
    setTimeout(() => {
        message.classList.remove("active")

    }, 3000)
}
function addActive() {
    message.classList.add("active")
}
function clearInput() {
    name.value = ""
    price.value = ""
    categorie.value = ""
}
async function remove(ProduitId) {
    try {
        message.innerHTML = "Suppression du produit en cours..."
        addActive()
        let response = await fetch(`http://localhost:3000/produits?id=${ProduitId}`, {
            method: "DELETE"
        })
        if (!response.ok) {
            throw new Error("Error")
        }
        let result = await response.text()
        message.innerHTML = result
    } catch (err) {
        message.innerHTML = "Une erreur est survenue lors de la suppression du produit. Veuillez réessayer."
    }
    addActive()
    removeActive()
    start()
}
async function update(idproduit) {
    try {
        message.innerHTML = "Chargement des informations du produit...";
        addActive()

        let response = await fetch(`http://localhost:3000/produits?id=${idproduit}`)

        if (!response.ok) {
            throw new Error("Error")
        }
        let produit = await response.json()
        message.classList.remove("active")
        name.value = produit.name
        price.value = (produit.price != "gratuit" ? produit.price : "")
        categorie.value = produit.category
        mode = "update"
        addModifier.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Modifier'
        idproduitModier = idproduit
    } catch (err) {
        message.innerHTML = "Une erreur est survenue. Veuillez réessayer"
        addActive()
        removeActive()
    }

}

async function search() {
    let search = document.getElementById("search")
    let data = await getdata()
    let dataExport = []
    for (let i = 0; i < data.length; i++) {
        if (data[i].name.toLowerCase().includes(search.value.toLowerCase())) {
            dataExport.push(data[i])
        }
    }
    read(dataExport)
}