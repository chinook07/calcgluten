const express = require("express");
const morgan = require("morgan");

const {
    ajoutRecu,
    toutesDonnees
} = require("./handlers")

express()
    .use(morgan("tiny"))
    .use(express.json())
    .use(express.static("public"))
    .get("/api/toutes-donnees", toutesDonnees)
    .post("/api/ajout-recu", ajoutRecu)
    .get("*", (req, res) => {
        res.status(404).json({
            status: 404,
            message: "Désolé, erreur🍞!"
        })
    })
    .listen(8000, () => console.log(`Listening on port 8000`));