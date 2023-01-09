const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);
const db = client.db();

const openSesame = async () => {
    await client.connect();
    console.log("connected!");
}

const closeSesame = async () => {
    await client.close();
    console.log("disconnected!");
}

const toutesDonnees = async (req, res) => {
    await openSesame();
    const items = await db.collection("recus").find().toArray();
    const bases = await db.collection("basecomp").find().toArray();
    let catalogue = [
        [], []
    ];
    const cles = Object.keys(bases[0]);
    const valeurs = Object.values(bases[0])
    cles.forEach((aliment, index) => {
        if (aliment != "_id") {
            catalogue[0].push(aliment)
            catalogue[1].push(valeurs[index])
        }
    })
    await closeSesame();
    return res.status(200).json({ status: 200, items, catalogue, message: "Voici vos reçus." })
}

const ajoutRecu = async (req, res) => {
    const { magasin, date, items } = req.body;
    await openSesame();
    await db.collection("recus").insertOne({ magasin, date, items });
    await closeSesame();
    return res.status(201).json({ status: 201, message: `nouveau reçu de ${items.length} items ajoutés` })
}

const modifMoyenne = async (req, res) => {
    const { aliment, prixEntre } = req.body;
    await openSesame();
    await db.collection("basecomp").updateOne({}, { $set:{ [aliment]: parseFloat(prixEntre) } })
    await closeSesame();
    return res.status(200).json({ status: 200, message: "Moyenne mis à jour" })
}

const nouvMoyenne = async (req, res) => {
    const { alimentEntre, prixEntre } = req.body;
    await openSesame();
    await db.collection("basecomp").updateOne({}, { $set: { [alimentEntre]: parseFloat(prixEntre) } })
    await closeSesame();
    return res.status(200).json({ status: 200, message: "Aliment ajouté" })
}

const supprimerMoyenne = async (req, res) => {
    const { aliment } = req.body;
    await openSesame();
    await db.collection("basecomp").updateOne({}, { $unset: { [aliment]: "" } })
    await closeSesame();
    return res.status(200).json({ status: 200, message: "Aliment supprimé" })
}

module.exports = {
    ajoutRecu,
    toutesDonnees,
    modifMoyenne,
    nouvMoyenne,
    supprimerMoyenne
}