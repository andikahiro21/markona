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
exports.getScriptbyID = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Scripts.findOne({
      where: { id: id }
    });
    if (!response) {
      return handleClientError(res, 404, `Scripts Not Found...`);
    }
    res.status(200).json({ data: response, message: 'Success' });
  } catch (error) {
    return handleServerError(res);
  }
};

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

exports.deleteScripts = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return handleClientError(
        res,
        400,
        'Invalid or missing IDs in the request body.'
      );
    }

    const scripts = await Scripts.findAll({
      where: { id: ids },
      attributes: ['id'],
      raw: true
    });

    const foundIds = scripts.map((script) => script.id);
    const missingIds = ids.filter((id) => !foundIds.includes(id));

    if (missingIds.length > 0) {
      return handleClientError(
        res,
        404,
        `Script(s) with ID(s) ${missingIds.join(', ')} not found.`
      );
    }

    // Melakukan penghapusan setelah memastikan semua IDs valid
    const deletedScripts = await Promise.all(
      ids.map(async (id) => {
        const script = await Scripts.findOne({ where: { id } });

        if (script.path) {
          const filePath = path.join(
            __dirname,
            '..',
            'uploads',
            script.path.split('/').pop()
          );
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }

        await script.destroy();
        return { id, success: true, message: `Script with ID ${id} deleted.` };
      })
    );

    res
      .status(200)
      .json({ deletedScripts, message: 'Scripts deleted successfully.' });
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};
