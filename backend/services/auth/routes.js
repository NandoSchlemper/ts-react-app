import express from 'express';

const AuthRoutes = express.Router();

AuthRoutes.get('/register', (req, res) => {
    res.json("Aqui o usuário vai se registrar, fon")
})

AuthRoutes.get('/login', (req, res) => {
    res.json("Aqui o usuário vai fazer o Login, eba")
})

export { AuthRoutes }