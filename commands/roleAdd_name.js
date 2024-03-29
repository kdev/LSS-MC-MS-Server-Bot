const {
    createEmbed
} = require("./commandModules/roleAddedEmbed");


module.exports = {
    do: async params => {
        let regex = /^(leitstellenspiel|meldkamerspel|missionchief)\.?(de|com)?$/gi,
            match = regex.exec(params.args[0]),
            game = match[1].toLowerCase();

        switch (game) {
            case "leitstellenspiel":
                await params.message.member.addRole(params.deRole);
                break;

            case "meldkamerspel":
                await params.message.member.addRole(params.nlRole);
                break;

            case "missionchief":
                await params.message.member.addRole(params.usRole);
                break;

            default:
                return params.message.channel.send("Please type in a valid game name!");
        }
        let logEmbed = createEmbed(game, params.message.member, params.appName, params.version);

        params.message.delete();

        params.message.channel.send(`I have added the ${game === "leitstellenspiel" ? `🇩🇪 leitstellenspiel.de` : `${game === "meldkamerspel" ? `🇳🇱 meldkamerspel.com` : `🇺🇸 missionchief.com`}`} role to you`)
            .then(msg => {
                setTimeout(() => {
                    msg.delete();
                    params.logChannel.send({
                        embed: logEmbed
                    });
                }, 5000);
            });
    }
}