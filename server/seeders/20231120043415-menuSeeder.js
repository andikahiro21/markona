"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Menus", [
      {
        name: "Kopi Kapal Api",
        categoryID: 1,
        description: "Bisa request untuk pahit dan gula",
        type: "minuman",
        image: "http://localhost:3000/uploads/kapal-api.png",
        price: 3000,
        qty: 1,
      },
      {
        name: "Indomie Soto",
        categoryID: 2,
        description: "Ya... indomie rasa soto|| tidak pakai telur",
        type: "makanan",
        image: "http://localhost:3000/uploads/indomie-soto.png",
        price: 8000,
        qty: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
