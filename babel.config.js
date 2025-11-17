/**
 * CONFIGURACIÓN DE BABEL
 *
 * Babel es un "traductor" que convierte el código moderno de JavaScript/TypeScript
 * en código que React Native puede entender.
 */

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Este plugin nos permite usar las variables de entorno del archivo .env
      // Por ejemplo: process.env.SUPABASE_URL
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};
