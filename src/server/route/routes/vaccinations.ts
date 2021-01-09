import express from 'express';
export const router = express.Router();

router.get('/vaccinations', (req, res) => {
    res.send('hello vaccinations');
});