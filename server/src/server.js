const express = require("express");
const db = require("./models");

// require("./config/db.config");

const app = express();
const PORT = process.env.PORT || 5000;
const bodyparser=require('body-parser');

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

db.mongoose
  .connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

  app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.get("/", function (req, res) {
  res.json({ message: "Bienvenue à l'API du projet Cartographie VBG" });
});

require("./routes/front_office.router")(app);
require("./routes/back_office.router")(app);

app.listen(PORT, () => {
  console.log(`Le server écoute sur le port ${PORT}`);
});
