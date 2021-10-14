const router = require("express").Router();
const { unlink } = require("fs");

// import db connection
const dbConnection = require("../connection/db");
const uploadFile = require("../middlewares/uploadFile");
const pathFile = "http://localhost:3000/uploads/";

router.get("/add", function (req, res) {
  res.render("provinsi/form-add", {
    title: "Add Provinsi",
  });
});

router.get("/edit/:id", function (req, res) {
  const { id } = req.params;

  const query = "SELECT * FROM provinsi_tb WHERE id = ?";

  dbConnection.getConnection((err, conn) => {
    if (err) {
      throw err;
    }

    conn.query(query, [id], (err, results) => {
      if (err) throw err;

      let diresmikanDate = results[0].diresmikan.toISOString().split("T")[0];

      const provinsi = {
        ...results[0],
        image: pathFile + results[0].photo,
        diresmikanDate,
      };

      res.render("provinsi/form-edit", {
        title: "Form Edit Provinsi",
        provinsi,
      });
    });
    conn.release();
  });
});

router.post("/add", uploadFile("image"), function (req, res) {
  let { nama, diresmikan, pulau } = req.body;
  let image = req.file.filename;

  const query =
    "INSERT INTO provinsi_tb (nama, diresmikan, photo, pulau) VALUES (?,?,?,?)";

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, [nama, diresmikan, image, pulau], (err, result) => {
      if (err) throw err;

      res.redirect("/");
    });

    conn.release();
  });
});

router.post("/edit/:id", uploadFile("image"), function (req, res) {
  let { id, nama, diresmikan, pulau, oldImage } = req.body;

  let image = oldImage.replace(pathFile, "");

  if (req.file) {
    image = req.file.filename;
  }

  const queryDelFile = "SELECT photo FROM provinsi_tb WHERE id = ?";
  const queryEditData =
    "UPDATE provinsi_tb SET nama = ?, diresmikan = ?, photo = ?, pulau = ? WHERE id = ?";

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(queryDelFile, [id], (err, results) => {
      if (err) throw err;

      if (req.file) {
        unlink(`uploads/${results[0].photo}`, (err) => {
          if (err) throw err;
        });
      }

      conn.query(
        queryEditData,
        [nama, diresmikan, image, pulau, id],
        (err, results) => {
          if (err) throw err;

          res.redirect("/");
        }
      );
      conn.release();
    });
    conn.release();
  });
});

// handle delete type
router.get("/delete/:id", function (req, res) {
  const { id } = req.params;

  const queryDelFile = "SELECT photo FROM provinsi_tb WHERE id = ?";
  const queryDelData = "DELETE FROM provinsi_tb WHERE id = ?";

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(queryDelFile, [id], (err, results) => {
      if (err) throw err;

      unlink(`uploads/${results[0].photo}`, (err) => {
        if (err) throw err;
      });

      conn.query(queryDelData, [id], (err, results) => {
        if (err) throw err;

        res.redirect("/");
      });
      conn.release();
    });
    conn.release();
  });
});

router.get("/:id", function (req, res) {
  const { id } = req.params;

  const query = "SELECT * FROM provinsi_tb WHERE id = ?";

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, [id], (err, results) => {
      if (err) throw err;

      let diresmikanDate = results[0].diresmikan.toLocaleDateString("id-ID", {
        dateStyle: "long",
      });

      const provinsi = {
        ...results[0],
        image: pathFile + results[0].photo,
        diresmikanDate,
      };

      res.render("provinsi/detail", {
        title: "Provinsi Detail",
        provinsi,
      });
    });

    conn.release();
  });
});

module.exports = router;
