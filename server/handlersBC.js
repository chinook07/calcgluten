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

const nouvelAchat = async (req, res) => {
    const { dejaAchete } = req.body;
    if (dejaAchete.length > 0) {
        await openSesame();
        for (const element of dejaAchete) {
            const target = await db.collection("basecomp").findOne({ _id: ObjectId(element.id) })
            const nouveauStock = target.achete + element.qtePlus;
            await db.collection("basecomp").findOneAndUpdate(
                { _id: ObjectId(element.id) }, { $set: { achete: nouveauStock } }
            );
        }
        await closeSesame();
    }
    return res.status(201).json({ status: 201, message: `nouvel achat` })
}

const nouvelItem = async (req, res) => {
    const { pasDejaAchete } = req.body;
    if (pasDejaAchete.length > 0) {
        await openSesame();
        for (const element of pasDejaAchete) {
            await db.collection("basecomp").insertOne({
                aliment: element.aliment,
                prix: parseFloat(element.prix),
                achete: element.achete
            })
        }
        await closeSesame();
    }
    return res.status(200).json({ status: 200, message: "nouvel item" })
}

const reduireInventaire = async (req, res) => {
    const { aEnlever } = req.body;
    await openSesame();
    for (const element of aEnlever) {
        const target = await db.collection("basecomp").findOne({ aliment: element.item })
        const nouveauStock = target.achete - parseInt(element.qte)
        await db.collection("basecomp").updateOne({ aliment: element.item }, { $set:{ achete: parseFloat(nouveauStock) } })
    }
    await closeSesame;
    return res.status(200).json({ status: 200, message: "Inventaire mis à jour" })
}

const nouvMoyenne = async (req, res) => {
    const { alimentEntre, prixEntre, qteAchete } = req.body;
    await openSesame();
    await db.collection("basecomp").insertOne({
        aliment: alimentEntre,
        prix: parseFloat(prixEntre),
        achete: qteAchete
    })
    await closeSesame();
    return res.status(200).json({ status: 200, message: "Aliment ajouté" })
}

const modifMoyenne = async (req, res) => {
    const { aliment, prixEntre } = req.body;
    await openSesame();
    await db.collection("basecomp").updateOne({ aliment: aliment.aliment }, { $set:{ prix: parseFloat(prixEntre) } })
    await closeSesame();
    return res.status(200).json({ status: 200, message: "Moyenne mis à jour" })
}

const supprimerMoyenne = async (req, res) => {
    const { aliment } = req.body;
    await openSesame();
    await db.collection("basecomp").deleteOne({ aliment: aliment })
    await closeSesame();
    return res.status(200).json({ status: 200, message: "Aliment supprimé" })
}

module.exports = {
    nouvelAchat,
    nouvelItem,
    nouvMoyenne,
    modifMoyenne,
    reduireInventaire,
    supprimerMoyenne
}