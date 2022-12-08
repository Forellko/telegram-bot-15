const TelegramAPI = require('node-telegram-bot-api');

const token = '5515532924:AAFeu3va7IjgPAECs4nUOAzblw1MLqDZBJs';

const bot = new TelegramAPI(token, { polling: true });

bot.on('message', (msg) => {
  const text = msg.text;
  const chatID = msg.chat.id;

  if (text === '/start') {
    bot.sendSticker(
      chatID,
      'https://tlgrm.ru/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/5.webp'
    );
    bot.sendMessage(chatID, `Welcome ${msg.from.username}`);
  }

  if (text === '/info') {
    bot.sendMessage(
      chatID,
      `Тебя зовут: ${msg.from.first_name} ${msg.from.last_name}`
    );
  }
});
