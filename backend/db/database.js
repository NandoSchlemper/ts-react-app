import { mongoose } from 'mongoose';
import { config } from 'dotenv';
config();

async function connect_db() {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Conectado com o databasE MongoDB")

        // Definindo schemas
        const AssetSchema = new mongoose.Schema({
            name: String,
            properties: {type: Map, of: mongoose.Schema.Types.Mixed},
        });

        const DatabaseSchema = new mongoose.Schema({
            name: String,
            Assets: [AssetSchema],
        });

        const Database = mongoose.model('Database', DatabaseSchema);

        const TestItem = new Database({
            name: "Teste1",
            Assets: [{
                name: "Jogo do mengão",
                properties: {
                    "Pontuação mengão":10,
                    "Pontuação timão":15,
                }
            }]
        });

        await TestItem.save();
        console.log("Database + Asset de testes adicionados com sucesso!")

    } catch (error) {
        console.log("Erro ao se connectar ao DB: " + error)
    }
}

export {connect_db}