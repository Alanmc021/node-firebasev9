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
//Ler toda base de dados : Produtos



//Criar um novo produto

app.get("/produtos", (req, res) => {
    const produtosRef = admin.database().ref("produto");

    produtosRef.once('value')
        .then((snapshot) => {
            const produtos = [];

            snapshot.forEach((childSnapshot) => {
                const produto = childSnapshot.val();
                produto.id = childSnapshot.key;
                produtos.push(produto);
            });

            res.json(produtos); // Enviar a resposta como JSON
            console.log(produtos);
        })
        .catch((erro) => {
            res.status(500).json({ error: erro.message }); // Enviar erro como JSON
        });
});


app.post("/produto", (req, res) => {
    const produto = req.body

    admin.database().ref("produto").push(produto)
        .then(() => {
            res.status(200).send('Produto criada com sucesso')
        })
        .catch((err) => {
            res.status(500).send(erro);
        })
});
//Atualizar um novvo produto
//-Ne4aV92sRNMj0isCFrA

app.post("/atualizar/:id", (req, res) => {
    const produto = req.body
    const id = req.params.id

    admin.database().ref(`produto/${id}`).update(produto)
        .then(() => {
            res.send("O produto foi atualizado com sucesso")
        })
        .catch((erro) => {
            res.status(500).send(erro)
        })

})

//deletar um novo produto


app.delete("/produto/:id", (req, res) => {
    const id = req.params.id

    admin.database().ref(`produto/${id}`).remove()
        .then(() => {
            res.send("O produto foi removido com sucesso")
        })
        .catch((error) => {
            res.status(500).send(erro);
        })

})










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
