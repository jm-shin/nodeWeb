const desc = '[cipher]';
const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();
const ALGORITHM = process.env.ALGORITHM;
const KEY = process.env.KEY;
const IV = process.env.IV;

const encrypt = value => {
  const fn = 'encrypt';
  try {
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(KEY), IV);
    let result = cipher.update(value, 'utf8', 'base64');
    result += cipher.final('base64');
    console.log(`${desc} encrypt result [${result}]`);
    return result;
  } catch (error) {
    console.error(`${desc} ${fn} fail [${error}]`);
  }
};

const decrypt = value => {
  const fn = 'decrypt';
  try {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let result = decipher.update(value, 'base64', 'utf8');
    result += decipher.final('utf-8');
    console.log(`${desc} decrypt result [${result}]`);
    return result;
  } catch (error) {
    console.error(`${desc} ${fn} fail [${error}]`);
  }
};

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;
