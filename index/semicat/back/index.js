const nodemailer = require('nodemailer')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json());

app.listen(3005,()=>{
    console.log('server started')
})

const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port:'465',
    secure: true,
    auth:{
        user: 'semicat2.info@yandex.ru',
        pass: 'yibhkxbaqdejgmqj'
    }
})

// const mailOption = {
//     from:'man030603@mail.ru',
//     to:'man030603@mail.ru',
//     subject:'Test send',
//     text: 'Test send text'
// }
// transporter.sendMail(mailOption)

app.post('/sendMail',(req, res)=>{
    console.log(req.body)
    const name = req.body.name
    const email = req.body.email
    const text = req.body.text

    if((name && email && text) != ''){
        const mailOption = {
            from:'semicat2.info@yandex.ru',
            to: 'semicat2.info@yandex.ru',
            subject:'Test send',
            text: `Почта клиента: ${email}
            Имя клиента: ${name}
            Текст клиента: ${text}`
        }
        transporter.sendMail(mailOption)
    }
    else {
        console.log('err')
    }
})