const db = require("../model");
const User = db.users;

exports.create = (req, res) => {
  if (!req.body.username) {
    res.status(400).send({ message: "tidak boleh kosong" });
    return;
  }

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  });

  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error",
      });
    });
};

exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username
    ? { username: { $regex: new RegExp(username), $options: "i" } }
    : {};

  User.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error ambil data",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((data) => {
      if (!data) res.status(404).send({ message: "Not found " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error " + id });
    });
};

exports.findOneByUsername = (req, res) => {
  const username = req.params.username;

  User.findById({ username: { $regex: username, $options: "i" } })
    .then((data) => {
      if (!data) res.status(404).send({ message: "Not found " + username });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error " + username });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data update tidak boleh kosong",
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "error ",
        });
      } else res.send({ message: "update suskses." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error uupdate" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};
