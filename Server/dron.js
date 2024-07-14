import { parse } from "path"
const url = "mongodb+srv://ADMIT_numerpj:123456puii@numer.kxpwkmw.mongodb.net/?retryWrites=true&w=majority"


app.post('/data', async(res) => {
    const id = parse(res.params.id)
    const client = new MongoClient(url)
    client.connect()
    const DData = await client.bd('numerical').collection('numerpj').find().toArray()
    client.close()
    res.status(200).send(DData)

})