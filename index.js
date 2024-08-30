// const { Client, Intents } = require("discord.js")
// require("dotenv").config()
// const config = require("./config.json")
// const i18n= require ("i18n")

// const client  = new Client({
//     intents:[Intents.FLAGS.GUILDS]
// })

// client.once("ready", ()=>{//cliente.once => para que se ejecute una vez
//     console.log("ya esta listo")
// })

// client.on("interactionCreate", async interaction=>{
//  if(!interaction.isCommand()) return

//  const {comandName}= interaction

//  if (comandName== "Ping") {
//     await interaction.reply("Pong")//interaction.reply=> responde a la interacción
//  }
// })

// client.login(config.token)

const { Client, Partials } = require("discord.js");
require("dotenv").config()
require("./slashcommands")
const i18n= require ("i18n")
const { User, Message, GuildMember, ThreadMember } = Partials;
const client = new Client ({
intents: [53608447],
partials: [User, Message, GuildMember, ThreadMember],
}) ;
const JsonConfig={
    "token": process.env.token,
    "clientId": process.env.clientId,
    "guildId": process.env.guildId
}

const configJson=JsonConfig



client.config =configJson
client.on("ready", () => { console.log("El bot se inicio Correctamente")
});

client.on("interactionCreate", async interaction=>{
    if(!interaction.isCommand()) return
   console.log(interaction,"la interacton")
    const {commandName}= interaction
    // console.log(comandName,"nombre del comando",interaction)
    console.log("esta buscando con el commandName:",commandName)
   
    if (commandName=== "ping") {
        console.log("te contesta PONG")
       await interaction.reply("Pong")//interaction.reply=> responde a la interacción
    }
   })
client.login(client.config.token);
