const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

const mulheres = [
    {
        nome: 'Flavis Moreira',
        imagem: "https://bit.ly/3KHZfc2",
        minibio: 'QA Engeneer'

    },
    {
        nome: 'Iana Chan',
        imagem: "Não existe",
        minibio: 'Fundadora Programaria'

    },
    {
        nome: 'Ruth Milene',
        imagem: "Não existe",
        minibio: 'Terapeuta'

    },

]

function mostraMulheres(request, response) {
    response.json(mulheres)
}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta:", porta)
}

app.use(router.get("/mulheres", mostraMulheres))
app.listen(porta, mostraPorta)