module.exports = function (userData, dataString, body){
    let sendedData = []
    userData.forEach((x)=>{
        if(Object.keys(x)[0] === dataString){
            console.log('equal')
            sendedData.push(x[dataString])
        }
        // console.log(Object.keys(x))
    })
    sendedData.forEach((x)=>{
        let changeValueOn
        let changeValueTo
        x.timeOn.slice(0,1) === '0'  ? changeValueOn = x.timeOn.slice(1,2)
            : changeValueOn = x.timeOn.slice(0,2)

        x.timeTo.slice(0,1) === '0'  ? changeValueTo = x.timeTo.slice(1,2)
            : changeValueTo = x.timeTo.slice(0,2)

        x.devValue = {
            timeOnDev: {
                hour: changeValueOn,
                minutes: x.timeOn.slice(3,5),
                allTimeL: x.timeOn
            },
            timeToDev: {
                hour: changeValueTo,
                minutes: x.timeTo.slice(3,5),
                allTimeL:x.timeTo
            }
        }
    })
    return sendedData
}