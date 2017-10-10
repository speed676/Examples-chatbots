'use strict';

let util = require('util');
let http = require('http');
let TraductorBot = require('traductor_bot');
let Bot  = require('@kikinteractive/kik');

// Configure the bot API endpoint, details for your bot
let bot = new Bot({
    username: 'ejemplotraductor',
    apiKey: '4ef58753-d764-4ab9-a34d-5f19e8d0b361',
    baseUrl: 'https://a0b6dfff.ngrok.io/'
});

bot.updateBotConfiguration();

function enviarMensaje() {
	let jsonGenerico = { 
        "idReceptor": "001", 
        "idCanal": "001", 
        "contenido": { 
          "texto": "hola mundo", 
          "tipo": "text"
        }
    };
	return TraductorBot.KikBot.translateToBot(jsonGenerico);
}
console.log(enviarMensaje());

bot.onTextMessage((message) => {
	console.log(message.body);
	let election = message.body.split(" ");
	console.log(election[0]);
	switch(election[0]){
		case "/image":
			message.reply(Bot.Message.picture('http://i.imgur.com/oalyVlU.jpg'));
			break;
		case "/text":
			message.reply(election[1]);
			break;
		default:
			message.reply("Holi, no se ha recibio na de na men.");
			break;
	}
});

// Set up your server and start listening
let server = http
    .createServer(bot.incoming())
    .listen(process.env.PORT || 8080);