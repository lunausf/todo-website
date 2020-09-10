// This Sequelize Model represents todoitem table in PostgreSQL database. 
// These columns will be generated automatically: id, listId, description, status, createdAt, updatedAt.
module.exports = (sequelize, Sequelize) => {
    const Todoitem = sequelize.define("todoitem", {
      listid: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING 
      }
    });
  
    return Todoitem;
  };