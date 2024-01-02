const multer = require('multer');
const express = require('express');

const fileTextExtract = (filePath) => {
  return new Promise((resolve, reject) => {
    try {
      var path = require('path');
      var fullfilePath = path.join(__dirname, filePath);
      var extract = require('pdf-text-extract');
      extract(fullfilePath, function (err, pages) {
        if (err) {
          console.dir(err);
          reject("Error extracting text from PDF");
        } else {
          resolve(pages);
        }
      });
    } catch (e) {
      console.log(e);
      reject("Error processing file");
    }
  });
};

exports.processCV = async (req, res) => {
  try {
    if (!req.file || Object.keys(req.file).length === 0) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }
    const path = require('path');
    const filePath = path.resolve(__dirname, 'uploads', req.file.filename);
    const fileText = await fileTextExtract(filePath);
    res.json({ result: fileText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Internal Server error: ${err}` });
  }
};
