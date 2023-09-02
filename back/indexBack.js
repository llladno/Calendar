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
        client = await MongoClient.connect(
            'mongodb://localhost:27017/',
            { useNewUrlParser: true, useUnifiedTopology: true }
        ).catch(err => console.log('error'));
        collection = client.db('Calendar').collection('Calendar')
    }
    connect().then(console.log('ok')).catch(err =>{
        err ? console.log('ERROR')
            : console.log('ok')
    });

    app.get('/', async (req, res)=>{
    })

    app.get('/registration', async (req, res)=>{
        res.send('ok')
    })

    app.post('/registration', async (req, res)=>{
        await connect()
        let filter = {"user.login": req.body.emailControl, "user.password": req.body.passwordControl}
        const cursor = collection.find(filter)
        const result = await cursor.toArray();
        if (!result){
            res.status(200).send({status:'many'})
        }
        else{
            clearRequest = req.body
            await collection.insertOne({
                user: {
                    login: clearRequest.loginControl,
                    email: clearRequest.emailControl,
                    password: clearRequest.passwordControl,
                }
            });
            res.status(200).send({ status: 'ok'});
        }
    })

    app.post('/login',async (req,res) =>{
        await connect()
        console.log(req.body)
        // let filter = {"user.email": req.body.emailControl, "user.password": req.body.passwordControl}
        let filter = {"user.email": req.body.emailControl}
        const cursor = collection.find(filter)
        const result = await cursor.toArray();
        result ? res.status(200).send({ status: 'valid', userData: result[0]})
            :         res.status(200).send({ status: 'unvalid'});
        client.close()
    })

    app.listen(PORT, ()=>{
        console.log(`server Started on Port ${PORT}`)
    })


