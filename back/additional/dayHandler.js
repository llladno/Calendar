module.exports = function (userData, dataString, body){
    let sendedData = []
    userData.forEach((x)=>{
        if(Object.keys(x)[0] === dataString){
            console.log('equal')
            sendedData.push(x[dataString])
        }
        console.log(Object.keys(x))
    })
    sendedData.forEach((x)=>{
        console.log(x)
        // console.log(x[dataString])
        x.devValue = {
            timeOnDev: x.timeOn,
            timeTodev: x.timeTo

        }
    })
    return sendedData
}