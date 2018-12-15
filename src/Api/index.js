import path from 'path';
import express from 'express';
const router = express.Router();

router.get('/hello', (req, res) => {
    res.send('world!'); 
});

export default router;
