const db = require("../models");
const Todolist = db.todolists; 
const Todoitem = db.todoitems; 
const Op = db.Sequelize.Op;

//create a todolist
exports.createToDoList = (req, res) => {
  console.log("createToDoList")
  //validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "TodoList name can not be empty!"
    });
    return;
  }

  //Create a todoList
  const todolist = {
    name: req.body.name,
    description: req.body.description
  };

  //save todolist in the database
  Todolist.create(todolist)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
          message:
            err.message || "some error occurred while creating the todolist"
      });
    });
};

//create a todoitem
exports.createToDoItem = (req, res) => {
  //validate request
  if (!req.body.listId) {
    res.status(400).send({
      message: "listId can not be empty when create an item!"
    });
    return;
  }

  //Create a todoitem
  const todoitem = {
    listid: req.body.listId,
    description: req.body.description,
    status: req.body.status ? req.body.status : "todo"
  };

  //save todoitem in the database
  Todoitem.create(todoitem)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
          message:
            err.message || "some error occurred while creating the todoitem"
      });
    });
};

// Update a todoItem
exports.updateItem = (req, res) => {
  const itemId = req.params.itemId;

  Todoitem.update(req.body, {
    where: { id: itemId }   
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "TodoItem was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update TodoItem with itemId=${itemId}. Maybe TodoItem was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating TodoItem with id=${id}`
      });
    });
};

//delete a todoItem
exports.deleteTodoItem = (req, res) => {
  const itemId = req.params.itemId;

  Todoitem.destroy({
    where: { id: itemId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `TodoItem ${itemId} was deleted successfully!`
        });
      } else {
        res.send({
          message: `Cannot delete todoItem with itemId=${itemId}. Maybe itemId was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete itemId with itemId=${itemId}`
      });
    });
};

//delete a todoList
exports.deleteTodoList = (req, res) => {
  const listId = req.params.listId;

  //delete the todolist
  const deleteFromTodoList = (listId) => {
      Todolist.destroy({
      where: { id: listId }
    })
  }

  //delete all the todoitem that in the todolist
  const deleteFromTodoItems = (listId) => {
    Todoitem.destroy({
      where: { listid: listId }  
    })
  }

  Promise.all([
    deleteFromTodoItems(listId),
    deleteFromTodoList(listId)
  ])
    .then(nums => {
      res.send({
        message: `Todolist ${listId} was deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete listId with listId=${listId}`
      });
    });
};