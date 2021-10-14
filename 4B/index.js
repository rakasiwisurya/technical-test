// import package
const http = require("http");
const express = require("express");
const flash = require("express-flash");
const path = require("path");

const app = express();
const hbs = require("hbs");

const provinsiRoute = require("./routes/provinsi");
const kabupatenRoute = require("./routes/kabupaten");

// import db connection
const dbConnection = require("./connection/db");

// app.use(express.static('express'))
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// html form parser
app.use(express.urlencoded({ extended: false }));

// set views location to app
app.set("views", path.join(__dirname, "views"));

// set template/view engine
app.set("view engine", "hbs");

// register view partials
hbs.registerPartials(path.join(__dirname, "views/partials"));

// render index page
app.get("/", function (req, res) {
  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    const provinsi = [];
    const kabupaten = [];

    const queryProvinsi = "SELECT * FROM provinsi_tb ORDER BY nama ASC";

    const queryKabupaten = "SELECT * FROM kabupaten_tb ORDER BY nama ASC";

    conn.query(queryProvinsi, (err, results) => {
      if (err) throw err;

      for (let result of results) {
        let diresmikanDate = result.diresmikan.toLocaleDateString("id-ID", {
          dateStyle: "long",
        });

        provinsi.push({
          ...result,
          image: "http://localhost:3000/uploads/" + result.photo,
          diresmikanDate,
        });
      }

      conn.query(queryKabupaten, (err, results) => {
        if (err) throw err;

        for (let result of results) {
          let diresmikanDate = result.diresmikan.toLocaleDateString("id-ID", {
            dateStyle: "long",
          });

          kabupaten.push({
            ...result,
            image: "http://localhost:3000/uploads/" + result.photo,
            diresmikanDate,
          });
        }
      });
      conn.release();

      res.render("index", {
        titleHeader: "Wilayah Indonesia",
        titleProvinsi: "Provinsi",
        titleKabupaten: "Kabupaten",
        provinsi,
        kabupaten,
      });
    });
    conn.release();
  });
});

app.use("/provinsi", provinsiRoute);

app.use("/kabupaten", kabupatenRoute);

// create server app with port 3000
const server = http.createServer(app);
const port = 3000;
server.listen(port, () => {
  console.log(`server running on port: http://localhost:${port}`);
});
