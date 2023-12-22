const express = require('express')
const app = express()
const PORT = 3002
const cors = require('cors')
const bodyParser = require('body-parser')
const {MongoClient, Collection} = require('mongodb');
let dayHandler = require("./additional/dayHandler")
const {cl, date, m} = require("yarn/lib/cli");
const {timer} = require("./additional/timer");
// Local Server : 'mongodb://localhost:27017'
// const urlDB = 'mongodb://127.0.0.1:27017/'
// const urlDB = 'mongodb://myUserAdmin:abc123@109.68.215.157:27017/?authMechanism=DEFAULT'
const urlDB = 'mongodb://admin:123@localhost:27017/?authMechanism=DEFAULT'

//Reomote server: 'mongodb://26.226.199.170:27017'
// const urlDB = 'mongodb://26.226.199.170:27017'


const dateNow = new Date()

const startTime = process.uptime();

let client

app.use(cors())
app.use(bodyParser())


async function connect() {
    client = await MongoClient.connect(
        urlDB,
        {useNewUrlParser: true, useUnifiedTopology: true}
    ).catch(err => console.log('error', err));
        collection = client.db('Calendar').collection('Calendar')
}

connect().then(console.log('ok')).catch(err => {
    err ? console.log('ERROR', err)
        : console.log('ok')
});


// app.get('/registration', async (req, res) => {
//     res.send('ok')
// })

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
    console.log('newTask')
    let body = req.body
    let filter = {"user.email": req.body.email}
    let dataString = `${body.dayData.day},${body.dayData.month},${body.dayData.year}`
    let array = []
    let data = {
        timeOn: body.timeOn,
        timeTo: body.timeTo,
        task: body.task,
        dayData: body.dayData,
        color: body.color
    }
    array.push( {[dataString]: data})

    collection.updateOne(filter, {
        $push:{"user.data": array[0]}
    }).catch((err)=>console.log(err))
})

app.post('/newTaskTodoInDay', async (req, res) => {
    await connect()
    console.log('newTaskTodo')
    let body = req.body.requestData
    console.log(body)
    let filter = {"user.email": req.body.email}
    let dataString = `user.todo.${body.date.day},${body.date.month},${body.date.year}.type`
    let fullDate = `${body.date.day}-${body.date.month}-${body.date.year}`
    let array = []
    let data = {
        task: body.tasks,
        idTask: body.idTask,
        dayData: body.date,
        fullDate: fullDate,
        // color: body.color
    }
    console.log(data)
    array.push( {[dataString]: data})
    console.log(array)
    //

    // let fineee = collection.find({"user.todo": {[dataString]: {"type": "task"}}})
    let fineee = collection.find({[dataString]: "task"})
    let result = await fineee.toArray();
    if (result) {
        collection.updateOne(filter, {
            $push:{[`user.todo.${body.date.day},${body.date.month},${body.date.year}`]: data}
        }).catch((err)=>console.log(err))
    }
    else {
        collection.updateOne(filter, {
            $set:{[`user.todo.${body.date.day},${body.date.month},${body.date.year}`]: [data]}
        }).catch((err)=>console.log(err))
    }
    console.log(dataString)
    console.log(result)



    // collection.updateOne(filter, {
    //     $set:{"user.todo": array[0]}
    // }).catch((err)=>console.log(err))


})



app.post('/getDayInfoTodo', async (req, res) => {
    await connect()
    console.log(req.body)
    let body = req.body
    let dataString = `${body.data.day},${body.data.month},${body.data.year}`
    let Userfilter = {"user.email": body.email}
    const cursor = collection.find(Userfilter)

    const result = await cursor.toArray();
    let UserData = result[0].user.todo
    let dataToSend = []

    console.log(UserData)

    // UserData.forEach((x)=>{
    //     if (x[dataString]){
    //         dataToSend.push(x[dataString])
    //     }
    // })
    console.log()
    // let data = dayHandler(UserData, dataString)
    // await dayHandler(UserData, dataString, body)
    result ? res.status(200).send({status: 'valid', userData: UserData[dataString]})
        : res.status(200).send({status: 'unvalid'});
    client.close()
})


app.post('/deleteTaskTodoInDay', async (req, res) => {
    await connect()
    console.log(req.body)
    let body = req.body

    collection.updateOne({"user.email": "ok@"},{$pull: {[`user.todo.${body.date.day},${body.date.month},${body.date.year}`]: {"idTask": body.idTask}}}).then((x)=>{
        if (x.modifiedCount!=0){
            res.status(200).send({status: 'delete successful'})
        }
    })
    // console.log(UserData)
    // // let data = dayHandler(UserData, dataString)
    // // await dayHandler(UserData, dataString, body)
    // result ? res.status(200).send({status: 'valid', userData: dataToSend})
    //     : res.status(200).send({status: 'unvalid'});
    // client.close()
})

app.get('/',async (req,res)=>{
res.send('Hello World')
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
    result ? res.status(200).send({status: 'valid', userData: data})
        : res.status(200).send({status: 'unvalid'});
    client.close()
})

app.listen(PORT, () => {
    console.log(`server Started on Port ${PORT}`)
})


// async function  testRequest(){
//     await connect()
//     let body = {
//         email: 'ok@',
//         dayData: {
//             day: '2',
//             month: '9',
//             year: '2023'
//         }
//     }
//     let filter = {"user.email": body.email}
//     let dataString = `${body.dayData.day},${body.dayData.month},${body.dayData.year}`
//     let array = []
//     let data = {
//         timeOn: "00:10",
//         timeTo: "01:20",
//         task: "123",
//         timeOn: body.timeOn,
//         timeTo: body.timeTo,
//         task: body.task,
//         dayData: body.dayData,
//         color: body.color
//     }
//     array.push( {[dataString]:             {
//             timeOn: "00:10",
//             timeTo: "01:20",
//             task: "123",
//             timeOn: body.timeOn,
//             timeTo: body.timeTo,
//             task: body.task,
//             dayData: body.dayData,
//             color: body.color
//         }})
//     let example = {
//         "timeOn": "00:10",
//         "timeTo": "01:20",
//         "task": "123",
//         "dayData": {
//             "day": "3",
//             "month": "9",
//             "year": "2023"
//         }}
//     let checkKey = [`user.data.${dataString}`]
//     let checkValue = [example]
//
//     let dataObj = {}
//
//     for (let i = 0; i < checkKey.length; i++) {
//         dataObj[checkKey[i]] = checkValue[i];
//     }
//     console.log(dataObj)
//
//     array2.push({[dataString2]: array[0]})
//     let array3 = array2[0]
//     // console.log(array[0])
//     // console.log(array2[0])
//     // console.log(array3[0])
//     //
//     // collection.updateOne(filter, {
//     //     $push:{dataString2: array[0]}
//     // }).catch((err)=>console.log(err))
//
//     collection.updateOne(filter, {$push:{'user.date':array[0]}},{upsert:true}
//     ).catch((err)=>console.log(err))
//     client.close()
// }
//
// setTimeout(()=>{
//     testRequest()
//     console.log('testRequest OK')
// },2000)





// db.Calendar.updateOne({"user.email": "ok@"},{$set:{"user.data":"3,9,2023": {
//     "timeOn": "12:20",
//         "timeTo": "13:40",
//         "task": "123",
//         "dayData": {
//         "day": "1",
//             "month": "9",
//             "year": "2023"
//     },
//     "color": "#000000"
// }}},{upsert:true})
//
//
//
//
// "timeOn": "00:10",
//     "timeTo": "01:20",
//     "task": "123",
//     "dayData": {
//     "day": "3",
//         "month": "9",
//         "year": "2023"
// }

let time = 0
const timernewDate = dateNow
const timeFn = ()=>{
    let dateTimer = new Date (time*1000)
    // timernewDate.setSeconds(time)
    // console.log(dateNow)
    // console.log(timernewDate - dateNow)
    // console.log(timernewDate)
}
app.get('/info', (req,res)=>{
    const currentTime = process.uptime();
    console.log(startTime)
    console.log(dateNow)
// Разница между текущим временем и временем запуска сервера
    const elapsedTimeInSeconds = currentTime - startTime;

// Преобразование секунд в дни, часы, минуты и секунды
    const days = Math.floor(elapsedTimeInSeconds / (24 * 60 * 60));
    const hours = Math.floor((elapsedTimeInSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((elapsedTimeInSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(elapsedTimeInSeconds % 60);
    res.send({data: {
        days:days.toString(),
            hours: hours.toString(),
            minutes:minutes.toString(),
            seconds: seconds.toString()
        },
        startTime: dateNow.toLocaleString()
    })
    console.log(days,hours,minutes, seconds)
})
setInterval(()=>{
    time += 1
    timeFn()
},1000)