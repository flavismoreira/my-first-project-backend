const express = require("express")

const app = express()
const porta = 3333

function mostraPorta() {
    console.log("Servidor criado e rodando na porta:", porta)
}

app.listen(porta, mostraPorta)  //ligar servidor


//MongoDB
//flavismoreira
//7UPz78VtUSyVT6Ge

//string de conexao bd
//mongodb+srv://flavismoreira:7UPz78VtUSyVT6Ge@clusterflavis.16q0k2q.mongodb.net/?retryWrites=true&w=majority