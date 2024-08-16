import express from 'express';
import mongoose from 'mongoose';
import { Database } from '../../db/database.js';

const TestRouter = express.Router();

TestRouter.get('/collections', async (req, res) => {
    try {
        const allCollections = await mongoose.connection.db.listCollections().toArray();
        res.status(200).json(allCollections)
    } catch (err) {
        res.status(200).json({message: err.message})
    }
});

TestRouter.get('/itens', async (req, res) => {
    try {
        const allItens = await Database.find({});
        res.status(200).json(allItens)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

export {TestRouter}