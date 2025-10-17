const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

// coffee-store
// SJMzQes6FnURucGf


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster033.bpxhzqh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster033`;

// const uri = "mongodb+srv://<db_username>:<db_password>@cluster033.bpxhzqh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster033";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();

        const coffeesCollection = client.db('coffeeDB').collection('coffees');

        app.post('/coffees', async (req, res) => {
            const newCoffee = req.body
            console.log(newCoffee);
            const result = await coffeesCollection.insertOne(newCoffee);
            res.send(result)
        })

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("coffee server");
})

app.listen(port, () => {
    console.log('Coffee server is running on port :', port);
})