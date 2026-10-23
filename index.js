import { MongoClient, ObjectId } from 'mongodb';
import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json())

const client = new MongoClient(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ac-60bn0fd-shard-00-00.sjbqgbd.mongodb.net:27017,ac-60bn0fd-shard-00-01.sjbqgbd.mongodb.net:27017,ac-60bn0fd-shard-00-02.sjbqgbd.mongodb.net:27017/?ssl=true&replicaSet=atlas-d0wf76-shard-0&authSource=admin`);

export async function connectToMongoDB() {
  try {
    await client.connect()
    console.log("You successfully connected to MongoDB!");
    return client

  } catch (error) {
    console.dir(error)
  }
}
const connnectClient = await connectToMongoDB()
const db = connnectClient.db('SimpleCrud')
const users = db.collection("user");

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.get('/users', async (req, res) => {
  const cursor = users.find({})
  const allusers = await cursor.toArray()
  res.send(allusers)
})

app.get('/users/:id', async (req, res) => {
  const id = req.params.id
  const query = { _id: new ObjectId(id) }
  const result = await users.findOne(query)
  res.send(result)
})

app.patch('/users/:id', async (req, res) => {
  try {
    const id = req.params.id
    const updatedUser = req.body;
    const filter = { _id: new ObjectId(id) }
    const options = { upsert: true }
    const updateDoc = {
      $set: {
        name: updatedUser.name,
        email: updatedUser.email
      }
    }
    const result = await users.updateOne(filter, updateDoc, options)
    res.send(result)
  } catch (error) {
    console.log("PATCH error:", error)
    res.status(500).send({ error: error.message })
  }
})

app.delete('/users/:id', async (req, res) => {
  const id = req.params.id
  const query = { _id: new ObjectId(id) }
  const result = await users.deleteOne(query);
  res.send(result)
})

app.post('/users', async (req, res) => {
  const newUser = req.body;
  console.log("new user add", newUser);

  const result = await users.insertOne(newUser);
  res.send(result)

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});