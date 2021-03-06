const saveRAL = require("./saveRAL");

module.exports = {
    name: 'checkRAL',
    secret: false,
    description: "Checks if any sooners (RAL) are up",
    execute(params, bot)
    {
        var time = (60 - new Date().getSeconds()) * 1000;

        var check = function (bot)
        {
            var date = new Date();
            var hour = date.getHours();
            var minute = date.getMinutes();

            bot.sooners.forEach(sooner =>
            {
                if (hour === sooner.hour && minute === sooner.minute)
                {
                    //ping and remove from the ready at list
                    if(sooner.type = 'at')
                    {
                        bot.readyBotChannel.send(`Are ya ready yet, <@${sooner.id}>?`);
                        bot.sooners.delete(sooner.id);
                        bot.helpers('saveRAL', 0);
                    }
                    //written by Jasper Rutherford.
                    //unready and remove from the ready until list
                    else if(sooner.type = 'until')
                    {
                        bot.readyBotChannel.send(`<@${sooner.id}> is no longer ready.`);
                        bot.client.things.get('textcommands').get('notready').execute(message, 'auto', bot);
                        bot.sooners.delete(sooner.id);
                        bot.helpers('saveRAL', 0);
                    }
                }
            });
            //written by Josiah Vanevenhoven
            //remove from the ready at until list if they never readied
            bot.RAUL.forEach(element => {
                if (element[3] === hour && element[4] === minute)
                {
                    bot.RAUL.delete(element[0]);
                    bot.helpers('saveRAUL', 0);
                }
            });
        }

        //start looping when there are 0 loose seconds
        setTimeout(function ()
        {
            check(bot);

            //loop every 60 seconds
            setInterval(function ()
            {
                check(bot);
            }, 60000);

            console.log('Timer started');
        }, time);
    }
}  