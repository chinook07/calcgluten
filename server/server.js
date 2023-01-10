const express = require("express");
const morgan = require("morgan");

const {
    ajoutRecu,
    toutesDonnees,
    nouvMoyenne,
    modifMoyenne,
    supprimerMoyenne
} = require("./handlers")

express()
    .use(morgan("tiny"))
    .use(express.json())
    .use(express.static("public"))
    .get("/api/toutes-donnees", toutesDonnees)
    .post("/api/ajout-recu", ajoutRecu)
    // .put("/api/modif-recu", modifRecu)
    // .delete ("/api/supprimer-recu", supprimerRecu)
    .post("/api/nouvelle-moyenne", nouvMoyenne)
    .put("/api/modifier-moyenne", modifMoyenne)
    .delete("/api/supprimer-moyenne", supprimerMoyenne)
    .get("*", (req, res) => {
        res.status(404).json({
            status: 404,
            message: "Désolé, erreur🍞!"
        })
    })
    .listen(8000, () => console.log(`Listening on port 8000`));