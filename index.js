import { MongoClient } from 'mongodb';
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
await connectToMongoDB()


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});