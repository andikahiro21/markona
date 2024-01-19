const {
  handleServerError,
  handleClientError
} = require('../helpers/handleError');
const { Scripts } = require('../models');
const fs = require('fs');
const path = require('path');
const {
  validateBodyScript,
  validateBodyEditScript
} = require('../helpers/validationJoi');

exports.getScripts = async (req, res) => {
  try {
    const response = await Scripts.findAll();
    res.status(200).json({ data: response, message: 'Success' });
  } catch (error) {
    return handleServerError(res);
  }
};
// exports.getMenubyID = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const response = await Menu.findOne({
//       where: { id: id }
//     });
//     if (!response) {
//       return handleClientError(res, 404, `Menu Not Found...`);
//     }
//     res.status(200).json({ data: response, message: 'Success' });
//   } catch (error) {
//     return handleServerError(res);
//   }
// };

exports.createScript = async (req, res) => {
  try {
    const newData = req.body;

    if (!req.file) {
      return handleClientError(res, 400, 'File Required');
    }

    const validate = validateBodyScript(newData);
    if (validate) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return handleClientError(res, 400, validate);
    }

    if (req.file) {
      const filePath = req.file.path.replace(/\\/g, '/');
      const fileName = filePath.replace(/^uploads\//, '').replace(/\.pdf$/, '');
      newData.path = `http://localhost:2025/${filePath}`;
      newData.file_name = fileName;
    }

    const existingScript = await Scripts.findOne({
      where: { file_name: newData.file_name }
    });
    if (existingScript) {
      return handleClientError(
        res,
        400,
        `File Name ${newData.file_name} already exists...`
      );
    }

    const newScript = await Scripts.create(newData);

    res.status(201).json({ data: newScript, message: 'Script Created...' });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return handleServerError(res);
  }
};

exports.editScript = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const validate = validateBodyEditScript(updatedData);
    if (validate) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return handleClientError(res, 400, validate);
    }

    const script = await Scripts.findOne({ where: { id } });

    if (!script) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return handleClientError(res, 404, `Script with ID ${id} not found.`);
    }

    if (req.file) {
      const filePath = req.file.path.replace(/\\/g, '/');
      updatedData.path = `http://localhost:2025/${filePath}`;
      if (script.path) {
        const oldPath = path.join(
          __dirname,
          '..',
          'uploads',
          script.path.split('/').pop()
        );
        fs.unlinkSync(oldPath);
        const fileName = filePath
          .replace(/^uploads\//, '')
          .replace(/\.pdf$/, '');

        updatedData.file_name = fileName;
      }
    }

    await script.update(updatedData);
    const scriptUpdated = await Scripts.findOne({ where: { id } });

    res
      .status(200)
      .json({ data: scriptUpdated, message: 'Script updated successfully.' });
  } catch (error) {
    console.log(error);
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
      const imagePath = path.join(
        __dirname,
        '..',
        'uploads',
        selectedMenu.image.split('/').pop()
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    const purchase = await Purchase.findOne({ where: { menuID: id } });
    if (purchase) {
      return handleClientError(
        res,
        404,
        `Unable to delete the menu due to its association with existing purchase data.`
      );
    }

    await Menu.destroy({ where: { id: id } });

    res.status(200).json({ message: 'Menu have been deleted' });
  } catch (error) {
    return handleServerError(res);
  }
};
