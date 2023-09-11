const express = require('express')
const app = express()
const PORT = 3002
const cors = require('cors')
const bodyParser = require('body-parser')
const {MongoClient} = require('mongodb');
let dayHandler = require("./additional/dayHandler")
const {cl} = require("yarn/lib/cli");
// Local Server : 'mongodb://localhost:27017'
const urlDB = 'mongodb://admin:123@localhost:27017/?authMechanism=DEFAULT'

//Reomote server: 'mongodb://26.226.199.170:27017'
// const urlDB = 'mongodb://26.226.199.170:27017'


let client

app.use(cors())
app.use(bodyParser())


async function connect() {

    client = await MongoClient.connect(
        urlDB,
        {useNewUrlParser: true, useUnifiedTopology: true}
    ).catch(err => console.log('error'));
        collection = client.db('Calendar').collection('Calendar')
}

connect().then(console.log('ok')).catch(err => {
    err ? console.log('ERROR')
        : console.log('ok')
});

app.get('/', async (req, res) => {
})

app.get('/registration', async (req, res) => {
    res.send('ok')
})

app.post('/registration', async (req, res) => {
    await connect()
    let filter = {"user.login": req.body.emailControl, "user.password": req.body.passwordControl}
    const cursor = collection.find(filter)
    const result = await cursor.toArray();
    if (!result) {
        res.status(200).send({status: 'many'})
    } else {
        clearRequest = req.body
        await collection.insertOne({
            user: {
                login: clearRequest.loginControl,
                email: clearRequest.emailControl,
                password: clearRequest.passwordControl,
            }
        });
        res.status(200).send({status: 'ok'});
    }
})

app.post('/login', async (req, res) => {
    await connect()
    console.log(req.body)
    // let filter = {"user.email": req.body.emailControl, "user.password": req.body.passwordControl}
    let filter = {"user.email": req.body.emailControl}
    const cursor = collection.find(filter)
    const result = await cursor.toArray();
    result ? res.status(200).send({status: 'valid', userData: result[0]})
        : res.status(200).send({status: 'unvalid'});
    client.close()
})

app.post('/newTask', async (req, res) => {
    await connect()
    console.log(req.body)
    let body = req.body
    // let filter = {"user.email": req.body.emailControl, "user.password": req.body.passwordControl}
    let filter = {"user.email": req.body.email}
    let dataString = `${body.dayData.day},${body.dayData.month},${body.dayData.year}`
    let array = []
    array.push( {[dataString]:             {
            timeOn: req.body.timeOn,
            timeTo: req.body.timeTo,
            task: req.body.task,
            dayData: req.body.dayData
        }})
    let array2 = []
    let dataString2 = `user.data.${Object.keys(array[0])}`

    array2.push({[dataString2]: array[0]})
    console.log(Object.keys(array[0]))
    console.log(array)
    let array3 = array2[0]


    collection.updateOne(filter, {
        $push:{"user.data": array[0]}
    }).catch((err)=>console.log(err))

    setTimeout(async () => {
        const cursor = collection.find(filter)
        const result = await cursor.toArray();
        console.log(result)
        result ? res.status(200).send({status: 'valid', userData: result[0]})
            : res.status(200).send({status: 'unvalid'});
        client.close()
    }, 1000)
})

app.post('/getDayInfo', async (req, res) => {
    await connect()
    console.log(req.body)
    let body = req.body
    let dataString = `${body.data.day},${body.data.month},${body.data.year}`
    let Userfilter = {"user.email": body.email}
    const cursor = collection.find(Userfilter)
    // const cursor = collection.find({"user.email": req.body.email,
    //     "user.data": {
    //         $elemMatch: {
    //             "2,9,2023": {
    //                 $exists: true // Проверка наличия объекта с указанным ключом
    //             }
    //         }}})
    const result = await cursor.toArray();
    let UserData = result[0].user.data
    // let sendedData = []
    // console.log(UserData)
    // UserData.forEach((x)=>{
    //     if(Object.keys(x)[0] === dataString){
    //         console.log('equal')
    //         sendedData.push(x)
    //     }
    //     console.log(Object.keys(x))
    // })
    let data = dayHandler(UserData, dataString)
    await dayHandler(UserData, dataString, body)
    console.log(data)
    result ? res.status(200).send({status: 'valid', userData: data})
        : res.status(200).send({status: 'unvalid'});
    client.close()
})

app.listen(PORT, () => {
    console.log(`server Started on Port ${PORT}`)
})


