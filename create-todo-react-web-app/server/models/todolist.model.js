// This Sequelize Model represents todolist table in PostgreSQL database. 
// These columns will be generated automatically: id, name, description, createdAt, updatedAt.
module.exports = (sequelize, Sequelize) => {
    const Todolist = sequelize.define("todolist", {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return Todolist;
  };