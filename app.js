const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello node!');
});

app.listen(port, () => { //생성된 서버가 port를 바라보게한다.(listen)
    console.log(`Server running at http://localhost:${port}`)
});
