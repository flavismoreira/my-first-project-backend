const mongoose = require("mongoose")
require("dotenv").config()

async function conectaBd() {
    try {
        console.log("Conexão com o BD iniciou")

        await mongoose.connect(process.env.MONGO_URL)

        console.log("Conexão com o BD realizada com sucesso")
    } catch(erro) {
        console.log(erro)
    }
}

module.exports = conectaBd