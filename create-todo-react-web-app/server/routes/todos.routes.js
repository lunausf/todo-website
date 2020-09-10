
module.exports = app => {
    const todos = require("../controllers/todos.controller.js");
  
    var router = require("express").Router();
  
    // Create a new todolist
    router.post("/addToDoList", todos.createToDoList);
  
    // Create a todoItem for a specific list
    router.post("/addToDoItem", todos.createToDoItem);
  
    // Update a todoItem
    router.put("/updateItem/:itemId", todos.updateItem);
  
    // Delete a TodoListItem
    router.delete("/deleteToDoItem/:itemId", todos.deleteTodoItem);
  
    // Delete a TodoList
    router.delete("/deleteToDoList/:listId", todos.deleteTodoList);
  
    app.use('/api/v1', router);
  };