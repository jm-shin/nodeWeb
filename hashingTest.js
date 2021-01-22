const crypto = require('crypto');

//node crypto 사용 예제.
//salt, key 값 생성
const password = 'azbc123';
const salt = crypto.randomBytes(32).toString('base64');
const hashedPassword = crypto.pbkdf2Sync(password, salt, 108236, 64, 'sha512').toString('base64');

console.log('salt: ', salt);
console.log('입력한 암호: ', hashedPassword);

// //기존 암호와 비교
// const result = crypto.pbkdf2('abc123', salt, 108236, 64, 'sha512', (err, key) => {
//   console.log('기존 암호비교:', key.toString('base64'));
//   console.log('동일한 암호인가요? ', key.toString('base64') === hashedPassword);
// });

const result = crypto.pbkdf2Sync(password, salt, 108236, 64, 'sha512').toString('base64');

console.log('비교할 암호: ', result);
console.log(hashedPassword === result);
