import express from 'express';
import routes from './routes/food.routes.js';

const app = express();

app.use(express.json());

app.use('/api', routes);

app.use((req, res) => {
    res.status(404).json({
        error: 'endpoint não encontrado',
        message: `a rota ${req.method} ${req.originalUrl} não existe`,
        available_routes: [
            'GET /food',
            'GET /food/search',
            'GET /food/:id',
        ]
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
