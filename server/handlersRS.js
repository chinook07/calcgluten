const { MongoClient, ObjectId } = require("mongodb");
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
    const { magasin, date, items } = req.body;
    await openSesame();
    await db.collection("recus").insertOne({ magasin, date, items });
    await closeSesame();
    return res.status(201).json({ status: 201, message: `nouveau reçu ajouté` })
}

const supprimerRecu = async (req, res) => {
    const { aDetruire } = req.body;
    await openSesame();
    await db.collection("recus").findOneAndDelete({ _id: ObjectId(aDetruire._id) });
    await closeSesame();
    return res.status(200).json({ status: 200, message: "Reçu supprimé" })
}

const enleverItemAchete = async (req, res) => {
    const { recuAModifier, aEnlever } = req.body;
    await openSesame();
    await db.collection("recus").findOneAndUpdate(
        { _id: ObjectId(recuAModifier) }, { $pull: { items: {item: aEnlever.item} } }
    )
    await closeSesame();
    return res.status(200).json({ status: 200, message: "Enlevé un item" })
}

module.exports = {
    ajoutRecu,
    toutesDonnees,
    supprimerRecu,
    enleverItemAchete
}