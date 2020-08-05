import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express(); // função chamando a função

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333); 

// card trello nlw