const fs = require('fs');
const csvParser = require('csv-parser');

function readDatabase(filePath) {
    return new Promise((resolve, reject) => {
        const results = {};

        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => {
                const { firstname, lastname, age, field } = row;
                if (!results[field]) {
                    results[field] = [];
                }
                results[field].push(firstname);
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(`Error reading the CSV file: ${error.message}`);
            });
    });
}

module.exports = {
    readDatabase
};
