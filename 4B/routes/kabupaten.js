const router = require("express").Router();
const { unlink } = require("fs");

// import db connection
const dbConnection = require("../connection/db");
const uploadFile = require("../middlewares/uploadFile");
const pathFile = "http://localhost:3000/uploads/";

router.get("/add", function (req, res) {
  res.render("kabupaten/form-add", {
    title: "Add Kabupaten",
  });
});

router.get("/edit/:id", function (req, res) {
  const { id } = req.params;

  const query = "SELECT * FROM kabupaten_tb WHERE id = ?";

  dbConnection.getConnection((err, conn) => {
    if (err) {
      throw err;
    }

    conn.query(query, [id], (err, results) => {
      if (err) throw err;

      let diresmikanDate = results[0].diresmikan.toISOString().split("T")[0];

      const kabupaten = {
        ...results[0],
        image: pathFile + results[0].photo,
        diresmikanDate,
      };

      res.render("kabupaten/form-edit", {
        title: "Form Edit Kabupaten",
        kabupaten,
      });
    });
    conn.release();
  });
});

router.post("/add", uploadFile("image"), function (req, res) {
  let { nama, provinsi_id, diresmikan } = req.body;
  let image = req.file.filename;

  const query =
    "INSERT INTO kabupaten_tb (nama, provinsi_id, diresmikan, photo) VALUES (?,?,?,?)";

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, [nama, provinsi_id, diresmikan, image], (err, result) => {
      if (err) throw err;

      res.redirect("/");
    });

    conn.release();
  });
});

router.post("/edit/:id", uploadFile("image"), function (req, res) {
  let { id, nama, provinsi_id, diresmikan, oldImage } = req.body;

  let image = oldImage.replace(pathFile, "");

  if (req.file) {
    image = req.file.filename;
  }

  const queryDelFile = "SELECT photo FROM kabupaten_tb WHERE id = ?";
  const queryEditData =
    "UPDATE kabupaten_tb SET nama = ?, provinsi_id = ?,diresmikan = ?, photo = ? WHERE id = ?";

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
        [nama, provinsi_id, diresmikan, image, id],
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

  const queryDelFile = "SELECT photo FROM kabupaten_tb WHERE id = ?";
  const queryDelData = "DELETE FROM kabupaten_tb WHERE id = ?";

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

  const query = "SELECT * FROM kabupaten_tb WHERE id = ?";

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, [id], (err, results) => {
      if (err) throw err;

      let diresmikanDate = results[0].diresmikan.toLocaleDateString("id-ID", {
        dateStyle: "long",
      });

      const kabupaten = {
        ...results[0],
        image: pathFile + results[0].photo,
        diresmikanDate,
      };

      res.render("kabupaten/detail", {
        title: "Kabupaten Detail",
        kabupaten,
      });
    });

    conn.release();
  });
});

module.exports = router;
