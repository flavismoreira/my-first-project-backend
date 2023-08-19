const express = require("express") // iniciando express
const router = express.Router() // configurando primeira parte da rota
const cors = require("cors") // trazendo o pacote cors, que permite instalar essa api no frontend
//const { v4: uuidv4 } = require('uuid')

const conectaBd = require("./bd") //ligando o banco de dados ao arquivo bd
conectaBd() //chamando a função que conecta o bd

const Mulher = require("./mulherModel")

const app = express() // iniciando o app
app.use(express.json())
app.use(cors())

const porta = 3333 // criando a porta

//criando lista inicial de mulheres
const mulheres = [
    {   
        id: "1",
        nome: 'Flavis Moreira',
        imagem: "https://bit.ly/3KHZfc2",
        minibio: 'QA Engeneer'

    },
    {
        id: "2",
        nome: 'Iana Chan',
        imagem: "Não existe",
        minibio: 'Fundadora Programaria'

    },
    {
        id: "3",
        nome: 'Ruth Milene',
        imagem: "Não existe",
        minibio: 'Terapeuta'

    },

]

//GET
async function mostraMulheres(request, response) {
    try{
        const mulheresVindasDoBd = await Mulher.find()

        response.json(mulheresVindasDoBd)
    }catch (erro) {
        console.log(erro)
    }
    //response.json(mulheres)
}

//POST
async function criaMulher(request, response) {
    const novaMulher = new Mulher({
        //id: uuidv4(),
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })

    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    } catch (erro) {
        console.log(erro)
    }
    //mulheres.push(novaMulher)

    //response.json(mulheres)
}

//PATCH
async function corrigeMulher(request, response) {
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)
        

    if(request.body.nome) {
        mulherEncontrada.nome = request.body.nome
    }

    if(request.body.minibio) {
        mulherEncontrada.minibio = request.body.minibio
    }

    if(request.body.imagem) {
        mulherEncontrada.imagem = request.body.imagem
   
    }
    if(request.body.citacao) {
        mulherEncontrada.citacao = request.body.citacao
   
    }
    
    const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
    response.json(mulherAtualizadaNoBancoDeDados)
    
    }catch(erro) {
        console.log(erro)
    }
}

//DELETE
async function deletaMulher(request, response) {
    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({ mensagem: "Mulher deletada com sucesso!"})

    } catch(erro) {
        console.log(erro)
    }
    
}

//PORTA
function mostraPorta() {
    console.log("Servidor criado e rodando na porta:", porta)
}

app.use(router.get("/mulheres", mostraMulheres)) // configuração rota get/mulheres
app.use(router.post("/mulheres", criaMulher)) // cinfiguração rota post/mulheres
app.use(router.patch("/mulheres/:id", corrigeMulher)) // configuração rota patch/mulheres/:id
app.use(router.delete("/mulheres/:id", deletaMulher)) // configuração rota delete/mulheres/:id

app.listen(porta, mostraPorta) // servidor ouvindo a porta