import express from 'express';
export const router = express.Router();

router.get('/covid', (req, res) => {
    res.send('hello covid');
});