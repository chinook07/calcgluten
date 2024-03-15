const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);
const db = client.db();

const ouvrirMongo = async () => {
    await client.connect();
    console.log("connecté!");
}

const fermerMongo = async () => {
    await client.close();
    console.log("déconnecté!");
}

const testApi = async (req, res) => {
    return res.status(200).json({ status: 200, message: "succès" })
}

const toutesDonnees = async (req, res) => {
    await ouvrirMongo();
    const recus = await db.collection("recus").find().toArray();
    const catalogue = await db.collection("basecomp").find().toArray();
    await fermerMongo();
    return res.status(200).json({ status: 200, recus, catalogue, message: "Voici vos reçus." })
}

const ajoutRecu = async (req, res) => {
    const { magasin, date, items } = req.body;
    await ouvrirMongo();
    await db.collection("recus").insertOne({ magasin, date, items });
    await fermerMongo();
    return res.status(201).json({ status: 201, message: `nouveau reçu ajouté` })
}

const supprimerRecu = async (req, res) => {
    const { aDetruire } = req.body;
    await ouvrirMongo();
    await db.collection("recus").findOneAndDelete({ _id: ObjectId(aDetruire._id) });
    await fermerMongo();
    return res.status(200).json({ status: 200, message: "Reçu supprimé" })
}

const ajouterItemAchete = async (req, res) => {
    const { recuAModifier, qte, item, prix } = req.body;
    await ouvrirMongo();
    db.collection("recus").findOneAndUpdate(
        { _id: ObjectId(recuAModifier) }, { $push: { items: {qte, item, prix} } }
    )
    await fermerMongo();
    return res.status(200).json({ status: 200, message: "Enlevé un item" })
}

const enleverItemAchete = async (req, res) => {
    const { recuAModifier, aEnlever } = req.body;
    await ouvrirMongo();
    db.collection("recus").findOneAndUpdate(
        { _id: ObjectId(recuAModifier) }, { $pull: { items: {item: aEnlever.item} } }
    )
    await fermerMongo();
    return res.status(200).json({ status: 200, message: "Enlevé un item" })
}

module.exports = {
    testApi,
    toutesDonnees,
    ajoutRecu,
    supprimerRecu,
    ajouterItemAchete,
    enleverItemAchete
}