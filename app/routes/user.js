module.exports = (app) => {
  const users = require("../Controller/userController");

  var router = require("express").Router();

  router.post("/", users.create);

  router.get("/username/:username", users.findByUserName);
  router.get("/email/:email", users.findByEmail);
  router.get("/phone/:phone", users.findByPhone);
  router.get("/address/:address", users.findByAddress);

  router.get("/:id", users.findOne);

  router.patch("/:id", users.update);

  router.delete("/:id", users.delete);

  router.delete("/", users.deleteAll);

  app.use("/api/users", router);
};
