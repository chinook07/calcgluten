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

const nouvelItem = async (req, res) => {
    const { pasDejaAchete } = req.body;
    if (pasDejaAchete.length > 0) {
        await ouvrirMongo();
        for (const element of pasDejaAchete) {
            await db.collection("basecomp").insertOne({
                aliment: element.aliment,
                prix: parseFloat(element.prix),
                achete: element.achete
            })
        }
        await fermerMongo();
    }
    return res.status(200).json({ status: 200, message: "nouvel item" })
}

const nouvelAchat = async (req, res) => {
    const { dejaAchete } = req.body;
    if (dejaAchete.length > 0) {
        await ouvrirMongo();
        for (const element of dejaAchete) {
            const target = await db.collection("basecomp").findOne({ _id: ObjectId(element.id) })
            const nouveauStock = target.achete + element.qtePlus;
            await db.collection("basecomp").findOneAndUpdate(
                { _id: ObjectId(element.id) }, { $set: { achete: nouveauStock } }
            );
        }
        await fermerMongo();
    }
    return res.status(201).json({ status: 201, message: `nouvel achat` })
}

const augmenterInventaire = async (req, res) => {
    const { qte, item } = req.body;
    await ouvrirMongo();
    const target = await db.collection("basecomp").findOne({ aliment: item });
    if (target === null) {
        await fermerMongo();
        return res.status(200).json({ status: 200, ajoute: false, message: "Inventaire pas mis à jour" })
    } else {
        const nouveauStock = target.achete + qte;
        await db.collection("basecomp").findOneAndUpdate({ aliment: item }, { $set: { achete: nouveauStock } });
        await fermerMongo();
        return res.status(200).json({ status: 200, message: "Inventaire mis à jour" })
    }
}

const reduireInventaire = async (req, res) => {
    const { qte, item } = req.body;
    await ouvrirMongo();
    const target = await db.collection("basecomp").findOne({ aliment: item });
    const nouveauStock = target.achete - qte;
    await db.collection("basecomp").findOneAndUpdate({ aliment: item }, { $set: { achete: nouveauStock } })
    await fermerMongo;
    return res.status(200).json({ status: 200, message: "Inventaire mis à jour" })
}

const reduireInventaireMax = async (req, res) => {
    const { aEnlever } = req.body;
    await ouvrirMongo();
    for (const element of aEnlever) {
        const target = await db.collection("basecomp").findOne({ aliment: element.item })
        const nouveauStock = target.achete - parseInt(element.qte);
        await db.collection("basecomp").findOneAndUpdate({ aliment: element.item }, { $set: { achete: parseFloat(nouveauStock) } })
    }
    await fermerMongo;
    return res.status(200).json({ status: 200, message: "Inventaire mis à jour" })
}

const nouvMoyenne = async (req, res) => {
    const { alimentEntre, prixEntre, qteAchete } = req.body;
    await ouvrirMongo();
    await db.collection("basecomp").insertOne({
        aliment: alimentEntre,
        prix: parseFloat(prixEntre),
        achete: qteAchete
    })
    await fermerMongo();
    return res.status(200).json({ status: 200, message: "Aliment ajouté" })
}

const modifMoyenne = async (req, res) => {
    const { aliment, prixEntre } = req.body;
    await ouvrirMongo();
    await db.collection("basecomp").updateOne({ aliment: aliment.aliment }, { $set:{ prix: parseFloat(prixEntre) } })
    await fermerMongo();
    return res.status(200).json({ status: 200, message: "Moyenne mis à jour" })
}

const nouvNom = async (req, res) => {
    // pas terminé
    const { aliment, nomEntre } = req.body;
    // console.log(aliment, nomEntre);
    await ouvrirMongo();
    await db.collection("basecomp").find({ aliment: aliment.aliment }, { $set: { aliment: nomEntre } })
    // changer nom sur chaque reçu
    await db.collection("recus").updateMany(
        {"items.item": aliment.aliment}, { $set: { "items.$.item": nomEntre } }
    )
    // let resultat = await recherche.toArray();
    // console.log(resultat);
    await fermerMongo();
    return res.status(200).json({ status: 200, message: "Nom mis à jour" })
}

const supprimerMoyenne = async (req, res) => {
    const { aliment } = req.body;
    await ouvrirMongo();
    await db.collection("basecomp").deleteOne({ aliment: aliment })
    await fermerMongo();
    return res.status(200).json({ status: 200, message: "Aliment supprimé" })
}

module.exports = {
    nouvelAchat,
    nouvelItem,
    nouvNom,
    nouvMoyenne,
    modifMoyenne,
    augmenterInventaire,
    reduireInventaire,
    reduireInventaireMax,
    supprimerMoyenne
}