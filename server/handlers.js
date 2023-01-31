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
    const recus = await db.collection("recus").find().toArray();
    const catalogue = await db.collection("basecomp").find().toArray();
    await closeSesame();
    return res.status(200).json({ status: 200, recus, catalogue, message: "Voici vos reçus." })
}

const ajoutRecu = async (req, res) => {
    const { magasin, date, items, majBase } = req.body;
    await openSesame();
    // await db.collection("recus").insertOne({ magasin, date, items }); besoin de réactiver
    await majBase.forEach(element => {
        console.log(element);
        db.collection("basecomp").updateOne({ _id: element.id }, { $set:{ achete: 42 } })
    });
    await closeSesame();
    return res.status(201).json({ status: 201, message: `nouveau reçu ajouté` })
}

const nouvMoyenne = async (req, res) => {
    const { alimentEntre, prixEntre } = req.body;
    await openSesame();
    await db.collection("basecomp").insertOne({
        aliment: alimentEntre,
        prix: parseFloat(prixEntre),
        achete: 0
    })
    await closeSesame();
    return res.status(200).json({ status: 200, message: "Aliment ajouté" })
}

const modifMoyenne = async (req, res) => {
    const { aliment, prixEntre } = req.body;
    console.log(aliment);
    await openSesame();
    await db.collection("basecomp").updateOne({ aliment: aliment.aliment }, { $set:{ prix: parseFloat(prixEntre) } })
    await closeSesame();
    return res.status(200).json({ status: 200, message: "Moyenne mis à jour" })
}

const supprimerMoyenne = async (req, res) => {
    const { aliment } = req.body;
    console.log(aliment);
    await openSesame();
    await db.collection("basecomp").deleteOne({ aliment: aliment })
    await closeSesame();
    return res.status(200).json({ status: 200, message: "Aliment supprimé" })
}

module.exports = {
    ajoutRecu,
    toutesDonnees,
    nouvMoyenne,
    modifMoyenne,
    supprimerMoyenne
}