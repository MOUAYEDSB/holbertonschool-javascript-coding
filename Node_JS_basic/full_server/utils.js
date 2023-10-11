const fs = require('fs');

function readDatabase(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(`Error reading the file: ${err.message}`);
            } else {
                try {
                    const jsonData = JSON.parse(data);
                    const result = {};

                    jsonData.forEach(student => {
                        const { field, firstname } = student;
                        if (!result[field]) {
                            result[field] = [];
                        }
                        result[field].push(firstname);
                    });

                    resolve(result);
                } catch (error) {
                    reject(`Error parsing JSON data: ${error.message}`);
                }
            }
        });
    });
}

module.exports = {
    readDatabase
};
