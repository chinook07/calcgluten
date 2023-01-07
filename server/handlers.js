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

const ajoutRecu = async (req, res) => {
    const { magasin, date, items } = req.body;
    await openSesame();
    await db.collection("recus").insertOne({ magasin, date, items });
    await closeSesame();
    return res.status(201).json({ status: 201, message: `nouveau reçu de ${items.length} items ajoutés` })
}

const toutesDonnees = async (req, res) => {
    await openSesame();
    const items = await db.collection("recus").find().toArray();
    const bases = await db.collection("basecomp").find().toArray();
    const catalogue = bases[0].catalogue;
    console.log(catalogue);
    await closeSesame();
    return res.status(200).json({ status: 200, items, catalogue, message: "Voici vos reçus." })
}

module.exports = {
    ajoutRecu,
    toutesDonnees
}