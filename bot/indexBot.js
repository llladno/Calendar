const TelegramBot = require('node-telegram-bot-api')
const axios = require("axios");
const {keyTypeToAlg} = require("yarn/lib/cli");
const parse = process.env.TELEGRAM_PARSE_MOD

require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN

console.log(token)

const bot = new TelegramBot(token, { polling: true })


const commands = [

    {

        command: "start",
        description: "Запуск бота"

    },
    {

        command: "testconn",
        description: "Проверка сервера"

    },
    {

        command: "conncalendar",
        description: "Проверка календаря"

    },

]

bot.setMyCommands(commands);


async function checkConnection (port){
    try {
        const response = await axios.get(`http://109.68.215.157:${port}`);
        console.log(response);
        return response.status
    } catch (error) {
        console.error(error);
        return 404
    }
    // let status = await axios.get('http://109.68.215.157')
    //     .then(async function (response) {
    //         // handle success
    //     })
    //     .catch(function (error) {
    //         // handle error
    //         console.log(error);
    //     })
    //     .finally(function () {
    //     });
}



bot.onText(/\/testconn/, async (msg, match) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, 'секунду...')
let status = await checkConnection(80)
    let messae
    console.log(status)
    if (status !== 404) messae = 'Статус: Заебок работает!!!'
    else messae = 'Статус БИЛЯТЬ НЕ РАБОТАЕТ'
    const resp = match[1]

    setTimeout(()=>{
        if (!status) bot.sendMessage(chatId, 'Превышено время ожидания')
        else bot.sendMessage(chatId, messae)
    },500)
})

bot.onText(/\/conncalendar/, async (msg, match) => {
    const chatId = msg.chat.id
    const opts = {
        chat_id: msg.chat.id,
        message_id: msg.message_id,
    };''
    let opts2
    bot.sendMessage(chatId, 'Секунду... ⏳').then((x)=>{
        opts2 = {
            chat_id: x.chat_id,
            message_id: x.message_id
        }
        console.log(x)
    })

    let status = await checkConnection(3002)
    let message
    console.log(status)
    if (status !== 404) message = process.env.TELEGRAM_SUCCESS
    else message = 'Статус БИЛЯТЬ НЕ РАБОТАЕТ'
    const resp = match[1]

    setTimeout(()=>{
        bot.deleteMessage(chatId, opts2.message_id)
        if (!status) bot.sendMessage(chatId, `<b>Сайт:</b> Календарь 📅
${process.env.TELEGRAM_WAITING_TIME}`,
            { parse_mode: 'HTML' })
        else bot.sendMessage(chatId, `<b>Сайт:</b> Календарь 📅
${message}`, { parse_mode: 'HTML' })
    },500)
})