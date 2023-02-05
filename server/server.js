const express = require("express");
const morgan = require("morgan");

const {
    toutesDonnees,
    ajoutRecu,
    supprimerRecu,
    ajouterItemAchete,
    enleverItemAchete
} = require("./handlersRS")

const {
    nouvMoyenne,
    modifMoyenne,
    nouvelAchat,
    nouvelItem,
    augmenterInventaire,
    reduireInventaire,
    reduireInventaireMax,
    supprimerMoyenne
} = require("./handlersBC")

express()
    .use(morgan("tiny"))
    .use(express.json())
    .use(express.static("public"))

    .get("/api/toutes-donnees", toutesDonnees)
    .post("/api/ajout-recu", ajoutRecu)
    .delete("/api/supprimer-recu", supprimerRecu)
    .put("/api/ajouter-item-achete", ajouterItemAchete)
    .put("/api/enlever-item-achete", enleverItemAchete)

    .post("/api/nouvelle-moyenne", nouvMoyenne)
    .put("/api/augmenter-inventaire", augmenterInventaire)
    .put("/api/reduire-inventaire", reduireInventaire)
    .put("/api/reduire-inventaire-max", reduireInventaireMax)
    .put("/api/modifier-moyenne", modifMoyenne)
    .put("/api/nouvel-achat", nouvelAchat)
    .post("/api/nouvel-item", nouvelItem)
    .delete("/api/supprimer-moyenne", supprimerMoyenne)

    .get("*", (req, res) => {
        res.status(404).json({
            status: 404,
            message: "Désolé, erreur🍞!"
        })
    })
    .listen(8000, () => console.log(`Écoute active sur port 8000`));