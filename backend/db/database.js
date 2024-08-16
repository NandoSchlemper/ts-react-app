import { mongoose } from 'mongoose';
import { config } from 'dotenv';
config();

// Definindo schemas
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    tokens: [
        {
            tokens: {
                type: String,
                required: true
            },
        },
    ],
})

UserSchema.methods.verifyPassword = async function (password) {
    const user = this;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
}
// User model
const User = mongoose.model('User', UserSchema)


const AssetSchema = new mongoose.Schema({
    name: String,
    properties: {type: Map, of: mongoose.Schema.Types.Mixed},
});

const DatabaseSchema = new mongoose.Schema({
    name: String,
    Assets: [AssetSchema],
});

// Database model
const Database = mongoose.model('Database', DatabaseSchema);

async function connect_db() {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Conectado com o database: MongoDB ;)")
        
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

export {connect_db, Database, User}