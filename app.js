const express = require('express');
const csv = require('csv-parser');
const xlsx = require('xlsx');
const fs = require('fs');
const app = express();
app.get('/readfile', async (req, res) => {
  const fileType = req.query.type; 
  const filePath = './Sample-Spreadsheet-10-rows.csv';
  console.log(filePath);
  if (fileType === 'csv') {
    const csvData = [];
    fs.createReadStream(filePath)
    .on('error',()=>{
      console.log(error);
    })
      .pipe(csv())
      .on('data', (data) => {
         csvData.push(data);
         res.json(csvData);
        // console.log(data);
      })
      .on('end',() => {
        console.log('CSV file successfully processed');

      });
  } else if (fileType === 'xlsx') {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);
    console.log(data); 
    console.log('XLSX file successfully processed');
    res.send(data);
  } else {
    res.status(400).send('Invalid file type');
  }
});
app.listen(8000, () => {
  console.log('Server running on port 8000');
});
