// get the client
const mysql = require('mysql');
const crypto = require('crypto');

// create the connection to database
const pool = mysql.createPool({
  host: '192.168.1.254',
  port: 3306,
  user: 'crm-admin',
  password: '!core0908',
  database: 'CRM',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

//들어갈 변수
const password = 'abc123';
const info = { id: 'abc', name: 'auth', level: 0, email: 'abc@mail.com', department: '개발팀', uno: 1 };
const tableName = 'user';

const insertUser = function (info, password) {
  const fn = 'insertUser';
  return new Promise(function (resolve, reject) {
    // const hashSalt = bcrypt.genSaltSync(saltRounds);
    // const hashPassword = bcrypt.hashSync(password, hashSalt);
    const hashSalt = crypto.randomBytes(32).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(password, hashSalt, 108236, 64, 'sha512').toString('base64');

    const hashMobile = '010-3333-4444'; //원래는 hashing된 phone no.
    pool.getConnection(function (err, conn) {
      if (err) {
        if (conn) {
          conn.release();
        }
        reject(Error(`${fn} DB connection error`));
      }

      const columns = ['updated_at'];
      const sql = 'INSERT INTO ?? SET ? , ?? = NOW()';

      const data = {
        user_id: info['id'],
        user_name: info['name'],
        password: hashPassword,
        salt: hashSalt, //salt 다른 Table에 저장. (insert,update 부분 수정)
        op_class: info['level'],
        mobile: hashMobile,
        email: info['email'],
        department: info['department'],
        uno: info['uno'],
      };

      const exec = conn.query(sql, [tableName, data, columns[0]], function (err, rows) {
        conn.release();

        if (err) {
          reject(err);
        }

        resolve(rows);
      });
    });
  });
}; // insertUser

insertUser(info, password);
