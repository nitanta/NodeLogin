//config file
module.exports = {
  db: "mongodb+srv://admin:admin12345@cluster0-uqkdn.mongodb.net/test?retryWrites=true&w=majority",
  secret: "some-secret-shit-goes-here",
  refreshTokenSecret: "some-secret-refresh-token-shit",
  port: 3000,
  tokenLife: 900,
  refreshTokenLife: 86400
};
