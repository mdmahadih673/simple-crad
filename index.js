import { MongoClient } from 'mongodb';
import express from 'express'

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json())

const client = new MongoClient("mongodb+srv://crud_simple:MSWibsOs9jf6oe5M@cluster0.sjbqgbd.mongodb.net/");


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});