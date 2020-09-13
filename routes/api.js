const express = require("express");
const router = express.Router();
const TodoController = require("../Controllers/TodoController");

// get the data of a user
router.post("/login", TodoController.login);

// add a new user to the db
router.post("/register", TodoController.register);

// update a user in the db
router.put("/todo/:id", TodoController.todo);

// delete a user from the db
router.delete("/delete/:id", TodoController.delet);

module.exports = router;
