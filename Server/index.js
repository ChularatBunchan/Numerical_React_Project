const { MongoClient } = require("mongodb")
const uri = "mongodb+srv://ADMIT_numerpj:123456puii@numer.kxpwkmw.mongodb.net/?retryWrites=true&w=majority"
const express = require('express')
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const cors = require('cors')
const app = express()
const port = 3033

app.use(cors())
app.use(express.json());

app.get('/data/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const client = new MongoClient(uri);
  await client.connect();
  const user = await client.db('numerical').collection('numerpj').findOne({ "id": id });
  await client.close();
  res.status(200).send(user);
})

app.post('/data', async(req, res) => {
  const client = new MongoClient(uri);
  await client.connect();
  const users = await client.db('numerical').collection('numerpj').find({}).toArray();
  await client.close();
  res.status(200).send(users);
})

app.get('/', (req, res) => {
  res.send("server running")
})

app.put('/data/update', async (req, res) => {
  const user = req.body;
  const id = user.id;
  const client = new MongoClient(uri);
  await client.connect();
  await client.db('numerical').collection('numerpj').updateOne({ 'id': id }, {
    "$set": {
      x0: user.x0,
      x1: user.x1,
      xl: user.xl,
      xr: user.xr,
      fx: user.fx,
      id: user.id
    }
  });
  res.status(200).send({
    "status": "ok",
    "message": "User with ID = " + id + " is updated"
  });
})

app.delete('/data/delete', async (req, res) => {
  const id = parseInt(req.para.id);
  const client = new MongoClient(uri);
  await client.connect();
  await client.db('numerical').collection('numerpj').deleteOne({ 'id': id });
  res.status(200).send({
    "status": "ok",
    "message": "User with ID = " + id + " is deleted"
  });
})

app.post('/data/add', async (req, res) => {
  const user = req.body;
  const client = new MongoClient(uri);
  await client.connect();
  await client.db('numerical').collection('numerpj').insertOne({
    x0: user.x0,
    x1: user.x1,
    xl: user.xl,
    xr: user.xr,
    fx: user.fx,
    id: user.id
  });

  await client.close();
  res.status(200).send({
    "status": "ok",
    "message": "User with ID = " + user.id + " is created",
    "user": user
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
