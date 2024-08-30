const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const clientId = process.env.clientId;
const guildId = process.env.guildId;
const token = process.env.token;
const commands = [
  new SlashCommandBuilder().setName("ping").setDescription("pong"),
];

const rest = new REST({ version: "9" }).setToken(token);

createSlash();

async function createSlash() {
  try {
    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands } //cuerpo del comando
    );
    console.log("funciona");
  } catch (error) {
    console.error(error);
  }
}
