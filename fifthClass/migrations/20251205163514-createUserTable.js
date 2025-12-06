'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('users', {
        id:{
          type: Sequelize.INTEGER,
          primaryKey:true,
          allowNull:true
        },
        firstName:{
          type:Sequelize.STRING,
          allowNull:false
        },
         lastname:{
          type:Sequelize.STRING,
          allowNull:false
        },
         email:{
            type:Sequelize.STRING,
            unique:true,
            allowNull:false
          },
         password:{
            type:Sequelize.STRING,
            allowNull:false
          }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("users")
  }
};
