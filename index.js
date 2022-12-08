const { gameOptionsl, againOptions } = require('./options');

const TelegramAPI = require('node-telegram-bot-api');

const token = '5515532924:AAFeu3va7IjgPAECs4nUOAzblw1MLqDZBJs';

const bot = new TelegramAPI(token, { polling: true });

const chats = {};

const startGame = async (chatID) => {
  const randomNumber = Math.floor(Math.random() * 10);

  chats[chatID] = randomNumber;
  await bot.sendMessage(chatID, 'Отгадай цифру', gameOptions);
  console.log(randomNumber);
};

const start = () => {
  bot.setMyCommands([
    {
      command: '/start',
      description: 'Приветствие',
    },
    { command: '/info', description: 'Получить информацию' },
    { command: '/game', description: 'Сыграть в игру' },
  ]);

  bot.on('message', async (msg) => {
    const text = msg.text;
    const chatID = msg.chat.id;

    if (text === '/start') {
      await bot.sendSticker(
        chatID,
        'https://tlgrm.ru/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/5.webp'
      );
      return bot.sendMessage(chatID, `Welcome ${msg.from.username}`);
    }

    if (text === '/info') {
      return await bot.sendMessage(
        chatID,
        `Тебя зовут: ${msg.from.first_name} ${msg.from.last_name}`
      );
    }

    if (text === '/game') {
      startGame(chatID);
    }

    return bot.sendMessage(chatID, 'Я тебя не понимаю');
  });
  bot.on('callback_query', async (msg) => {
    const data = msg.data;
    const chatID = msg.message.chat.id;
    if (data === '/again') {
      return startGame(chatID);
    }
    if (+data === +chats[chatID]) {
      bot.sendMessage(chatID, 'Угадал', againOptions);
    } else {
      bot.sendMessage(chatID, 'Не угадал', againOptions);
    }
  });
};

start();
