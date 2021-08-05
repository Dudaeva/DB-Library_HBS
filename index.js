const express = require("express");
const mongoose = require("mongoose");
const hbs = require("express-handlebars");
const path = require("path");
const fileUpload = require("express-fileupload");

const app = express();

app.use(express.static(path.resolve(__dirname, "public")));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./routes/index"));

app.engine(".hbs", hbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");

const start = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://into:intocode@cluster0.hv9gm.mongodb.net/DB-library",
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }
    );
    app.listen(3000, () => {
      console.log("Server has been started...");
    });
  } catch (e) {
    console.log(e);
  }
};
start();
