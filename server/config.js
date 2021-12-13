require("dotenv").config();

const config = {
  port: process.env.PORT || 5000,
  mongo: process.env.MONGO_URI || "mongodb+srv://alhos996:alhos996@pizzaordercomposer.n9nav.mongodb.net/thirty?retryWrites=true&w=majority",
  secret: process.env.JWT_SECRET || "jabuka",
};

module.exports = config;
