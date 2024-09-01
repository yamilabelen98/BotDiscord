const { Client, Intents, REST, Routes } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [53608447],
  partials: ["USER", "MESSAGE", "GUILD_MEMBER", "THREAD_MEMBER"],
});

const token = process.env.token;
const clientId = process.env.clientId;
const guildId = process.env.guildId;

client.once("ready", () => {
  console.log("El bot se inició correctamente");

  // Registra los comandos en el servidor
  const rest = new REST({ version: "10" }).setToken(token);

  (async () => {
    try {
      console.log("Empezando a registrar los comandos");

      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: [
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
        ],
      });

      console.log("Comandos registrados correctamente");
    } catch (error) {
      console.error("Error al registrar comandos:", error);
    }
  })();
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  try {
    const { commandName, options } = interaction;

    if (commandName === "hola") {
      console.log("Recibido el comando /hola");
      await interaction.reply("Hola");
    } else if (commandName === "avatar") {
      console.log("Recibido el comando /avatar");
      const user = interaction.user;
      await interaction.reply(
        //interaction.reply=> responde a la interacción
        user.displayAvatarURL({ format: "png", size: 512 })
      );
    } else if (commandName === "youtube") {
      console.log("Recibido el comando /youtube");

      // Verificar si la opción que busco es válida
      const searchTerm = options.getString("buscar");
      if (!searchTerm) {
        throw new Error("No se pudo obtener el término de búsqueda.");
      }

      const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
        searchTerm
      )}`;
      console.log(`Generando enlace de búsqueda: ${youtubeSearchUrl}`);

      await interaction.reply(
        `Aquí está tu búsqueda en YouTube: ${youtubeSearchUrl}`
      );
    }
  } catch (error) {
    console.error(
      "Error al manejar la interacción:",
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
});

client.login(token);
