const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')
const token = '6586893963:AAFvLyuwTmo_DFcqzi9A7nGyczo0OUCqx0k'

const bot = new TelegramApi(token, {polling: true})

const chats = {}
const startGame = async (chatId)=> {
    await  bot.sendMessage(chatId, `Зараз я загадаю цифру від 1 до 10, а ти маєш угадати.`);
    chats[chatId] = Math.ceil(Math.random() * 10);
    await bot.sendMessage(chatId, `Відгадуй!`, gameOptions);
}
const start =()=> {
    bot.setMyCommands([
        {command: '/start', description: 'Вітання'},
        {command: '/info', description: 'Отримати інформацію про користувача'},
        {command: '/game', description: 'Давай пограємо :)'},
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        // console.log(text);
        switch (text){
            case '/start':
                await bot.sendSticker(chatId,'https://a127fb2c-de1c-4ae0-af0d-3808559ec217.selcdn.net/stickers/815/f04/815f04f9-dc94-450a-a6da-76bab8edbf4b/192/1.webp');
                return  bot.sendMessage(chatId, `Ласкаво просимо в телеграм бот Кавун!`);
            case '/info':
                return  bot.sendMessage(chatId, `Вас звуть ${msg.from.first_name} ${msg.from.last_name}`);
            case '/game':
                return startGame(chatId)
            default:
                return bot.sendMessage(chatId, `Не розумію вас :(`);
        }
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
         // console.log(msg);
        if (data === '/again') {
            return startGame(chatId)
        }
        if (+data === chats[chatId]){
            return bot.sendMessage(chatId, `Вітаю, ти вгадав цифру ${chats[chatId]}!`, againOptions)
        } else {
            return bot.sendMessage(chatId, `Нажаль, ти не вгадав. Бот загадав цифру ${chats[chatId]}`, againOptions)
        }
    })
}

start()