const mineflayer = require('mineflayer');
const http = require('http');

// سيرفر ويب وهمي لإبقاء الاستضافة مستيقظة
http.createServer((req, res) => {
    res.write("Bot is alive!");
    res.end();
}).listen(process.env.PORT || 3000);

function createBot() {
    const bot = mineflayer.createBot({
        host: 'AKATSUKII.aternos.me', // رابط سيرفرك
        port: 15074,                  // البورت الخاص بك (تأكد منه دائماً)
        username: 'AternosBot',       // اسم البوت داخل اللعبة
        version: false                // يكتشف إصدار السيرفر تلقائياً
    });

    bot.on('spawn', () => {
        console.log('البوت دخل السيرفر بنجاح!');
        // حركة بسيطة كل 30 ثانية لمنع الطرد بسبب الخمول (Anti-AFK)
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 30000);
    });

    bot.on('end', () => {
        console.log('انفصل البوت.. جاري إعادة الاتصال بعد 10 ثوانٍ...');
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => console.log('حدث خطأ: ', err));
}

createBot();
