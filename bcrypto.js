//bcrypt 모듈 사용 예제
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0//P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(myPlaintextPassword, salt);

console.log(salt);
console.log(hash);

console.log(bcrypt.compareSync(myPlaintextPassword, hash));
