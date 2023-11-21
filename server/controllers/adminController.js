const { handleServerError, handleClientError } = require("../helpers/handleError");
const { Menu } = require("../models");

exports.disabledMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const qty = 0;

    const menu = await Menu.findOne({ where: { id } });

    if (!menu) {
      return handleClientError(res, 404, `Menu with ID ${id} not found.`);
    }

    if (menu.qty == 0) {
      return handleClientError(res, 400, `Menu with name ${menu.name} already disabled`);
    }

    await menu.update({ qty: qty });
    const menuUpdated = await Menu.findOne({ where: { id } });

    res.status(200).json({ data: menuUpdated, message: "Menu successfully disabled." });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.reactivatedMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const qty = 1;

    const menu = await Menu.findOne({ where: { id } });

    if (!menu) {
      return handleClientError(res, 404, `Menu with ID ${id} not found.`);
    }

    if (menu.qty == 1) {
      return handleClientError(res, 400, `Menu with name ${menu.name} already active`);
    }

    await menu.update({ qty: qty });
    const menuUpdated = await Menu.findOne({ where: { id } });

    res.status(200).json({ data: menuUpdated, message: "Menu successfully disabled." });
  } catch (error) {
    return handleServerError(res);
  }
};
