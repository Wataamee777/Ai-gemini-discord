const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// 特定のチャンネルIDを設定
const TARGET_CHANNEL_ID = 'YOUR_TARGET_CHANNEL_ID';

client.once('ready', () => {
    console.log('Bot is ready!');
});

client.on('messageCreate', async (message) => {
    // Bot自身のメッセージやDMには反応しない
    if (message.author.bot || !message.guild) return;

    // 特定のチャンネルでのみ反応する
    if (message.channel.id === TARGET_CHANNEL_ID) {
        try {
            const response = await axios.post('https://api.geminiapi.com/endpoint', {
                input: message.content
            });
            message.reply(response.data.output);
        } catch (error) {
            console.error(error);
            message.reply('Error occurred while processing your request.');
        }
    }
});

client.login('YOUR_DISCORD_BOT_TOKEN');
