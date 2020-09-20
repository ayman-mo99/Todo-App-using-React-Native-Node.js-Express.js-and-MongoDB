const express = require("express");
const router = express.Router();
const TodoController = require("../Controllers/TodoController");

// Read the data of a user
router.post("/login", TodoController.login);

// Create a new user
router.post("/register", TodoController.register);

// Update the data of a user in the db
router.put("/todo/:id", TodoController.todo);

// Delete a user from the db
router.delete("/delete/:id", TodoController.delet);

module.exports = router;
