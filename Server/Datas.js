const { MongoClient } = require("mongodb")
const uri = "mongodb+srv://ADMIT_numerpj:123456puii@numer.kxpwkmw.mongodb.net/?retryWrites=true&w=majority"
const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors')
const app = express()
const port = 3033

app.use(cors())
app.use(express.json());

app.post('./data' , async (res) => {
  const client = new MongoClient(uri)
  await client.connect()
  const user = await client.db('numerical').collection('numerpj').find({}).toArray();
  // await client.close()
  console.log(user)
  res.status(200).send(user)
})
