const fs = require('fs');
const csvParser = require('csv-parser');
const xlsx = require('xlsx');

module.exports = {
    readCsv: function (filePath) {
        return new Promise((resolve, reject) => {
            const materialNames = [];

            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on('data', (row) => {
                    
                    if (row['Material Name']) {
                        materialNames.push(row['Material Name'].trim());
                    }
                })
                .on('end', () => resolve(materialNames))
                .on('error', (err) => reject(err));
        });
    
    },

        readExcel:async function(filePath)
    {
        const workbook = new ExcelJS.workbook();

        await workbook.xlsx.readFile(filePath);

        const sheetName = workbook.sheetName[0]; //Reads first sheet 

        const sheet = workbook.sheets[sheetName];

        const jsonData = xlsx.utils.sheet_to_json(sheet)

        const materialNamesexcel  = jsonData.map(row=> row['materialNamesexcel'].trim());

        


    }
    
}
  


