import express from 'express';
import { AuthRoutes } from '../../services/auth/routes.js';

function StartAPIServer() {
    try {
        // app + port
        const app = express();
        const port = "3000";
        // Json Middleware
        app.use(express.json());

        // Routing connectios
        app.use('/auth', AuthRoutes)

        app.listen(port, () => {
            console.log("Server rodando na porta:", port)
        })
    } catch (err) {
        console.log("Erro ao iniciar o servidor:", err)
    }
}

export {StartAPIServer}