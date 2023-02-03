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
    console.log(35, "insérez", items.length, "items");
    await closeSesame();
    return res.status(201).json({ status: 201, message: `nouveau reçu ajouté` })
}

const nouvelAchat = async (req, res) => {
    const { dejaAchete } = req.body;
    console.log(42, "acheté", dejaAchete);
    if (dejaAchete.length > 0) {
        console.log("changement à faire");
        await openSesame();
        for (const element of dejaAchete) {
            console.log(47, element);
            const target = await db.collection("basecomp").findOne({ _id: ObjectId(element.id) })
            const nouveauStock = target.achete + element.qtePlus;
            console.log(target.achete, "+", element.qtePlus, "=", nouveauStock);
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

const supprimerRecu = async (req, res) => {
    const { aDetruire } = req.body;
    await openSesame();
    await db.collection("recus").findOneAndDelete({ _id: ObjectId(aDetruire._id) });
    await closeSesame();
    return res.status(200).json({ status: 200, message: "Reçu supprimé" })
}

const reduireInventaire = async (req, res) => {
    const { aEnlever } = req.body;
    await openSesame();
    for (const element of aEnlever) {
        console.log(element);
        const target = await db.collection("basecomp").findOne({ aliment: element.item })
        const nouveauStock = target.achete - parseInt(element.qte)
        console.log(target.achete, "-", element.qte, "=", nouveauStock);
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
    nouvelAchat,
    nouvelItem,
    toutesDonnees,
    nouvMoyenne,
    supprimerRecu,
    modifMoyenne,
    reduireInventaire,
    supprimerMoyenne
}