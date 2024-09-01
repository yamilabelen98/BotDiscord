const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();
const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const spotifyUri = process.env.SPOTIFY_URI;
const spotifyApi = new SpotifyWebApi({
  clientId: spotifyClientId,
  clientSecret: spotifyClientSecret,
  redirectUri: spotifyUri,
});

async function getSpotifyAccessToken() {
  try {
    console.log("Spotify API arranca");
    const data = await spotifyApi.clientCredentialsGrant();
    console.log(
      "Nuevo token de acceso de Spotify obtenido, expira en",
      data.body["expires_in"],
      "segundos."
    );
    spotifyApi.setAccessToken(data.body["access_token"]);
  } catch (error) {
    console.error(
      "Error al obtener el token de Spotify:",
      error.message,
      error.stack
    );
  }
}

// Llama a getSpotifyAccessToken para inicializar el token de acceso}
getSpotifyAccessToken();
setInterval(getSpotifyAccessToken, 3600000);
module.exports = { spotifyApi };
