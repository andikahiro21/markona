const { handleServerError, handleClientError } = require("../helpers/handleError");
const { Menu, Purchase, Purchase_Group } = require("../models");
const joi = require("joi");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { CLIENT_RENEG_LIMIT } = require("tls");

exports.getMenu = async (req, res) => {
  try {
    const response = await Menu.findAll();
    res.status(200).json({ data: response, message: "Success" });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.getPurchaseMenu = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const response = await Purchase_Group.findAll({
      include: [
        {
          model: Purchase,
        },
      ],
      where: { userID: decoded.data.id },
    });
    res.status(200.0).json({ data: response, message: "Success" });
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

exports.getAllPurchaseMenu = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const response = await Purchase_Group.findAll({
      include: [
        {
          model: Purchase,
        },
      ],
      where: {
        status: "Order Receive",
        date: {
          [Op.gte]: today,
          [Op.lt]: tomorrow,
        },
      },
    });

    res.status(200.0).json({ data: response, message: "Success" });
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};
exports.getMenubyID = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Menu.findOne({
      where: { id: id },
    });
    if (!response) {
      return handleClientError(res, 404, `Menu Not Found...`);
    }
    res.status(200).json({ data: response, message: "Success" });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.createMenu = async (req, res) => {
  try {
    const newData = req.body;
    if (req.file) {
      const imagePath = req.file.path.replace(/\\/g, "/");
      newData.image = `http://localhost:3000/${imagePath}`;
    }
    newData.qty = 1;
    const scheme = joi.object({
      name: joi.string().required(),
      categoryID: joi.number().integer().required(),
      description: joi.string().allow(""),
      type: joi.string().required(),
      image: joi.string().uri().required(),
      price: joi.number().integer().required(),
      qty: joi.number().integer().min(0).required(),
    });

    const { error } = scheme.validate(newData);
    if (error) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return handleClientError(res, 400, error.details[0].message);
    }

    const existingMenu = await Menu.findOne({ where: { name: newData.name } });
    if (existingMenu) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return handleClientError(res, 400, `Menu with name ${newData.name} already exist...`);
    }

    const newMenu = await Menu.create(newData);

    res.status(201).json({ data: newMenu, message: "Menu Created..." });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return handleServerError(res);
  }
};

exports.editMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    if (req.file) {
      const image = req.file.path.replace(/\\/g, "/");
      updatedData.image = `http://localhost:3000/${image}`;
    }
    console.log(req.body, "<<<< BODY");
    console.log(req.file, "<<<< IMAGE");
    updatedData.qty = 1;

    const scheme = joi.object({
      name: joi.string().required(),
      categoryID: joi.number().integer().required(),
      description: joi.string().allow(""),
      type: joi.string().required(),
      // image: joi.string(),
      image: joi.string().uri().required(),
      price: joi.number().integer().required(),
      qty: joi.number().integer().min(0).required(),
    });

    const { error } = scheme.validate(updatedData);
    if (error) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return handleClientError(res, 400, error.details[0].message);
    }

    const menu = await Menu.findOne({ where: { id } });

    if (!menu) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return handleClientError(res, 404, `Menu with ID ${id} not found.`);
    }

    if (req.file) {
      const imagePath = req.file.path.replace(/\\/g, "/");
      updatedData.image = `http://localhost:3000/${imagePath}`;
      if (menu.image) {
        const oldImagePath = path.join(__dirname, "..", "uploads", menu.image.split("/").pop());
        fs.unlinkSync(oldImagePath);
      }
    }

    await menu.update(updatedData);
    const menuUpdated = await Menu.findOne({ where: { id } });

    res.status(200).json({ data: menuUpdated, message: "Menu updated successfully." });
  } catch (error) {
    console.log(error, "<< ERR");
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return handleServerError(res);
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const selectedMenu = await Menu.findOne({ where: { id: id } });

    if (!selectedMenu) {
      return res.status(404).json({ message: `Menu Not Found` });
    }

    if (selectedMenu.image) {
      const imagePath = path.join(__dirname, "..", "uploads", selectedMenu.image.split("/").pop());
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    const purchase = await Purchase.findOne({ where: { menuID: id } });
    if (purchase) {
      return handleClientError(res, 404, `Unable to delete the product due to its association with existing transaction data.`);
    }

    await Menu.destroy({ where: { id: id } });

    res.status(200).json({ message: "Menu have been deleted" });
  } catch (error) {
    console.log(error);
    return handleServerError(res);
  }
};
