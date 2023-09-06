const express = require('express');
const bodyPaser = require('body-parser');
const admin = require('firebase-admin');

const app = express()

app.use(bodyPaser.json());

const serviceAccount = require('./chave.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://teste-908b8-default-rtdb.firebaseio.com"
});


app.post("/produto", (req, res) => {

    const produto = req.body

    admin.database().ref("produto").push(produto)
        .then(() => {
            res.status(200).send('Pessoa criada com sucesso')
        })
        .catch((err) => {
            res.status(500).send(erro);
        })
});










//LER NO REALTIME DATE BASE COPO
app.get("/ler", (req, res) => {
    return res.send("OK")
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor inicando na porta ${PORT}`);
})

//CRIAR NO REALTIME DATE BASE COPO
//DELETAR NO REALTIME DATE BASE COPO
//EDITAR NO REALTIME DATE BASE COPO
