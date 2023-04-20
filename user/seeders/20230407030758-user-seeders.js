const bcrypt = require('bcrypt');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name:'admin',
        profession:'full stack developper',
        role:'admin',
        email:'admin@gmail.com',
        password: await bcrypt.hash('admin@123456789',15),
        created_at:new Date,
        updated_at:new Date,
      },{
        name:'john',
        profession:'backend developper',
        role:'student',
        email:'john@gmail.com',
        password: await bcrypt.hash('student@123456789',15),
        created_at:new Date(),
        updated_at:new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('users', null, {});
  }
};
