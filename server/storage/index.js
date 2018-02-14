const fs = require('fs'),
      path = require('path');

module.exports = {

    getData: () => {
        let dataPath = __dirname + path.join('/data/data.json');
        return new Promise((resolve, reject) => {
            fs.readFile(dataPath, 'utf8', (err, readData) => {
                if (err) {
                    reject(err);
                }

                resolve(JSON.parse(readData));
            });
        });
    }

};