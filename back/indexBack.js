const express = require('express')
const app = express()
const PORT = 3002
const cors = require('cors')
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb');
const urlDB = 'mongodb://localhost:27017'
let client

app.use(cors())
app.use(bodyParser())


async function connect (){
    const filter = {};
    client = await MongoClient.connect(
        'mongodb://localhost:27017/',
        { useNewUrlParser: true, useUnifiedTopology: true }
    );
    const coll = client.db('Calendar').collection('Calendar');
    const cursor = coll.find(filter);
    const result = await cursor.toArray();
    console.log(result)
}
connect().then(console.log('ok')).catch(err =>{
    err ? console.log('ERROR')
        : console.log('ok')
});


app.get('/', async (req, res)=>{
    // const filter = {};
    // const coll = client.db('Calendar').collection('Calendar');
    // const cursor = coll.find(filter);
    // const result = await cursor.toArray();
    // console.log(result)
})

app.get('/registration', async (req, res)=>{
    res.send('ok')
})

app.post('/registration', async (req, res)=>{
    console.log(req.body)
    res.send('ok')
})

app.listen(PORT, ()=>{
    console.log(`server Started on Port ${PORT}`)
})