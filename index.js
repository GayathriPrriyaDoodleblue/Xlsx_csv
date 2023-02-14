const multer = require("multer");
const express = require('express');
const app = express();
const fs = require('fs');
const path = require("path");
require("dotenv").config();
let port=process.env.PORT;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname+'-'+ Date.now());
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.mimetype === "text/csv") {
    cb(null,true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter });
  

app.post("/upload", upload.single("file"), async (req, res) => {
try{

    console.log(req.file);  
    if (!req.file)   return res.status(400).send({
      success: 400,
      message: 'Please upload proper file'
    });     
    const appDir = path.join(__dirname + './uploads')
    if(appDir){
      const message = "File uploaded successfully";
      const data = { filename: req.file.filename, size: req.file.size };
      res.status(200).json({ message: message, data: data });
    }
    } catch (error) {
      console.log(error);
      return res.send(`when trying upload files: ${error}`);
    }
  });
  
  app.listen(port, () => {
    console.log(`Server running on ${port}`);
  });