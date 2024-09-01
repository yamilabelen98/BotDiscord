const { Client, REST, Routes } = require("discord.js");
require("dotenv").config();
// Si deseas anular la utilización de un cliente de Spotify comenta esta línea y la que está en la linea debajo
require("./spotifyClient");
const { spotifyApi } = require("./spotifyClient");

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const commandsBody = [
  {
    name: "avatar",
    description: "Muestra tu foto de perfil",
  },
  {
    name: "hola",
    description: "Responde con Hola",
  },
  {
    name: "youtube",
    description: "Busca en YouTube",
    options: [
      {
        name: "buscar",
        type: 3, // Tipo STRING
        description: "El término que quieres buscar en YouTube",
        required: true,
      },
    ],
  },
  // Si deseas anular la utilización de spotify comenta este comando
  {
    name: "spotify",
    description: "Busca una canción en Spotify",
    options: [
      {
        name: "cancion",
        type: 3, // Tipo STRING
        description: "El nombre de la canción que quieres buscar",
        required: true,
      },
    ],
  },
];

const client = new Client({
  intents: [53608447],
  partials: ["USER", "MESSAGE", "GUILD_MEMBER", "THREAD_MEMBER"],
});

client.once("ready", async () => {
  console.log("El bot se inició correctamente");

  // Registra los comandos en el servidor
  const rest = new REST({ version: "10" }).setToken(token);

  (async () => {
    try {
      console.log("Empezando a registrar los comandos");

      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: commandsBody,
      });

      console.log("Comandos registrados correctamente");
    } catch (error) {
      console.error("Error al registrar comandos:", error);
    }
  })();
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  // Mapa de comandos a funciones
  const commandHandlers = {
    hola: handleHolaCommand,
    avatar: handleAvatarCommand,
    youtube: handleYoutubeCommand,
    spotify: handleSpotifyCommand,
  };

  // Verifica si existe un handler para el comando recibido
  const commandHandler = commandHandlers[commandName];
  if (commandHandler) {
    try {
      await commandHandler(interaction, options);
    } catch (error) {
      console.error(
        `Error al manejar el comando /${commandName}:`,
        error.message,
        error.stack
      );
      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({
          content: "Hubo un error al procesar tu solicitud.",
          ephemeral: true,
        });
      }
    }
  }
});

// Funciones manejadoras para cada comando
async function handleHolaCommand(interaction) {
  console.log("Recibido el comando /hola");
  await interaction.reply("Hola");
}

async function handleAvatarCommand(interaction) {
  console.log("Recibido el comando /avatar");
  const user = interaction.user;
  await interaction.reply(user.displayAvatarURL({ format: "png", size: 512 }));
}

async function handleYoutubeCommand(interaction, options) {
  console.log("Recibido el comando /youtube");
  const searchTerm = options.getString("buscar");
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    searchTerm
  )}`;
  console.log(`Generando enlace de búsqueda: ${youtubeSearchUrl}`);
  await interaction.reply(
    `Aquí está tu búsqueda en YouTube: ${youtubeSearchUrl}`
  );
}

async function handleSpotifyCommand(interaction, options) {
  console.log("Recibido el comando /spotify");

  try {
    const searchTerm = options.getString("cancion");
    const result = await spotifyApi.searchTracks(searchTerm);

    if (result.body.tracks.items.length > 0) {
      const track = result.body.tracks.items[0];
      const trackUrl = track.external_urls.spotify;
      await interaction.reply(
        `Aquí está la canción que encontré: [${
          track.name
        }](${trackUrl}) por ${track.artists
          .map((artist) => artist.name)
          .join(", ")}`
      );
    } else {
      await interaction.reply("No encontré ninguna canción con ese nombre.");
    }
  } catch (error) {
    console.error(
      "Error al manejar la búsqueda en Spotify:",
      error.message,
      error.stack
    );
    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({
        content: `Hubo un error al procesar tu solicitud: ${error.message}`,
        ephemeral: true,
      });
    }
  }
}

client.login(token);
