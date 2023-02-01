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
    // await db.collection("recus").insertOne({ magasin, date, items });
    // if (majBase.length > 0) arAncien(majBase);
    // if (majBase.length > 0) {
    //     majBase.forEach(element => {
    //         console.log(58, element);
    //         db.collection("basecomp").updateOne({ aliment: "test" }, { $set:{ achete: 42 } })
    //     });
    // }
    await closeSesame();
    return res.status(201).json({ status: 201, message: `nouveau reçu ajouté` })
}

const nouvelAchat = async (req, res) => {
    const { dejaAchete } = req.body;
    console.log(66, "acheté", dejaAchete);
    if (dejaAchete.length > 0) {
        console.log("changement à faire");
        await openSesame();
        // db.collection("basecomp").updateOne({ aliment: "test" }, { $set:{ achete: 42 } })
        // await db.collection("basecomp").findOneAndUpdate({ _id: ObjectId("63bcb9b21beb4b62f82dea48") }, { $set: { achete: 42 }});
        await dejaAchete.forEach(async (element) => {
            console.log(73, element);
            await db.collection("basecomp").findOneAndUpdate({ _id: ObjectId(element.id) }, { $set: { achete: element.qtePlus }});
        })
        await closeSesame();
    }
    return res.status(201).json({ status: 201, message: `nouvel achat` })
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
    toutesDonnees,
    nouvMoyenne,
    modifMoyenne,
    supprimerMoyenne
}