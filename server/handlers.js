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
    const { id, magasin, date, items } = req.body;
    await openSesame();
    // const items = await db.collection("nicola").find().toArray();
    // const nombre = sites.length + 1001;
    await db.collection("recus").insertOne({ id, magasin, date, items });
    // await db.collection("contributeurs").insertOne({ _id: nombre, contributeur })
    await closeSesame();
    return res.status(201).json({ status: 201, message: `nouveau reçu` })
}

const toutesDonnees = async (req, res) => {
    // console.log(res);
    console.log("handlers");
    await openSesame();
    const items = await db.collection("recus").find().toArray();
    console.log(items);
    await closeSesame();
    return res.status(200).json({ status: 200, items, message: "Voici vos données2." })
}

module.exports = {
    ajoutRecu,
    toutesDonnees
}