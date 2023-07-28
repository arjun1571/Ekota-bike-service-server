const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
require('dotenv').config()
const port = 5000;

// midleware
app.use(cors());
app.use(express.json());

const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.trgh7.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {serverApi: {version: ServerApiVersion.v1,strict: true,deprecationErrors: true,},});

async function run() {
  try {
    const serviceCollection = client.db("EkotaBike").collection("services");
    const orderCollection = client.db("EkotaBike").collection("orders");
    app.get("/services",async(req,res)=>{
      const query = {}
      const cursor = serviceCollection.find(query);
      const services= await cursor.toArray();
      res.send(services)
    })
    app.get("/services/:id",async(req,res)=>{
      const id=req.params.id;
      const query = {_id: new ObjectId(id)}
      const service = await serviceCollection.findOne(query);
      res.send(service)
    })

    // order 
      app.post("/orders",async(req,res)=>{
        const order = req.body;
        const result = await orderCollection.insertOne(order)
        res.send(result)

      })    
  } finally {
    
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


//  
// 