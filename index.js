const TelegramAPI = require('node-telegram-bot-api');

const token = '5515532924:AAFeu3va7IjgPAECs4nUOAzblw1MLqDZBJs';

const bot = new TelegramAPI(token, { polling: true });

bot.on('message', (msg) => {
  const text = msg.text;
  const chatID = msg.chat.id;

  if (text === '/start') {
    bot.sendMessage(chatID, `Welcome ${msg.from.username}`);
  }

  if (text === '/info') {
    bot.sendMessage(
      chatID,
      `Тебя зовут: ${msg.from.first_name} ${msg.from.last_name}`
    );
  }
});
