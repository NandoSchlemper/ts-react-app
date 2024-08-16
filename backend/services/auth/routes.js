import express from 'express';

const AuthRoutes = express.Router();

AuthRoutes.get('/', (req, res) => {
    res.send(`Nheco`)
})

export { AuthRoutes }