const express = require("express");
const router = express.Router();
let users = require("../userDatabase")
const User = require('../models/user')

router.get("/usersList", async (req, res) => {
  try {
    res.status(200).json({
      data: users
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

router.get("/usersList/:id", async (req, res) => {
  let { id } = req.params;
  id = Number(id);
  try {
    let user = users.find(user => user._id === id);
    res.status(200).json({
      data: user
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

router.post("/sign-up", (req, res) => {
  User.create(req.body.user)
  .then(user => {
    res.status(201).json({ user: user })
  })
  .catch(res.status(400).json({ message: "Some error occured" }))
})

module.exports = router;
