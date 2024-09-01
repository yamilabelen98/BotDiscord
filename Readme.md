<div align="center">

# **Bot de Discord**

</div>

<div >
  
Un bot de Discord diseñado como parte de mi aprendizaje en desarrollo de bots y automatización. Incluye funcionalidades básicas como comandos personalizados, moderación y respuestas automáticas, y está creado con un enfoque en la optimización y el uso eficiente de la API de Discord. Este proyecto forma parte de mi portafolio como muestra de mi habilidad en el desarrollo de bots y aplicaciones interactivas.

</div>

<div>

Para hacerlo funcionar, necesitas los siguientes elementos:

- **TOKEN, CLIENT_ID, GUILD_ID** de tu bot de Discord. Puedes seguir los pasos detallados en este [enlace](https://discord.com/developers/docs/quick-start/getting-started) para obtenerlos.
- Estas variables deberían estar en un archivo `.env`.

## Configuración de Spotify

Este proyecto también utiliza la API de Spotify para generar búsquedas de canciones en la aplicación. Para hacerlo funcionar, necesitarás:

- **SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_URI**. Puedes generarlos siguiendo los pasos en este [enlace](https://developer.spotify.com/dashboard).

## Instrucciones para Ejecutar el Bot

1. **Clona el Repositorio**

   Primero, clona este repositorio a tu máquina local usando el siguiente comando en tu terminal:

   ```bash
   git clone [URL_DEL_REPOSITORIO]


2. **Instala las Dependencias**

   Navega a la carpeta del proyecto y ejecuta:

   ```bash
   npm install

3. **Configura las Variables de Entorno**

   Navega a la carpeta del proyecto y ejecuta:
   Reemplaza los valores con los datos correspondientes que has obtenido.

   ```bash
   DISCORD_TOKEN=tu_token_de_discord
   DISCORD_CLIENT_ID=tu_client_id_de_discord
   DISCORD_GUILD_ID=tu_guild_id_de_discord
   SPOTIFY_CLIENT_ID=tu_client_id_de_spotify
   SPOTIFY_CLIENT_SECRET=tu_client_secret_de_spotify
   SPOTIFY_URI=tu_uri_de_spotify
  
4. **Arranca el Bot**

   Una vez que todo esté configurado, puedes iniciar el bot con el siguiente comando:
   ```bash
   npm install

  
</div>

---

<div align="center">

## Interacciones Disponibles

| Comando            | Descripción                                         | Ejemplo                                                    |
|--------------------|-----------------------------------------------------|------------------------------------------------------------|
| **/hola**          | Saludar con un mensaje personalizado.               | ![interacción hola](https://github.com/user-attachments/assets/54fc1088-9bb7-4ecf-9014-47c15bea468e) |
| **/avatar**        | Mostrar tu foto de perfil.                          | ![interacción avatar](https://github.com/user-attachments/assets/b61a299b-b969-4634-9339-35f6972e7354) |
| **/youtube**       | Generar un link de búsqueda en YouTube.             | ![interacción youtube](https://github.com/user-attachments/assets/c65f0e1f-5e7f-4396-b876-37ae8f4cd10c) |
| **/spotify**       | Buscar canciones en Spotify usando la API.          | ![interaccion spotify](https://github.com/user-attachments/assets/a6a44005-8b3a-4e58-996c-9936523e68c9) |


</div>

---
