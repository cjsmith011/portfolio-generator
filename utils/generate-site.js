const fs = require(`fs`);
const { resolve } = require("path/posix");

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            //if there's an error, reject the promise and send the error to the promise's catch method
            if (err) {
                reject(err);
                //return out of the function to make sure the promise doesn't execute
                return;
            }
            //if it worked, resolve the promise and let the user know
            resolve({
                ok: true,
                message: 'File created, yay!'
            });
        });
    });
};

const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', './utils/style.css', err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'File copied, woo hoo!'
            });
        });
    });
};
module.exports = {
    writeFile: writeFile,
    copyFile: copyFile
};