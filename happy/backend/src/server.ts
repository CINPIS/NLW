import express from 'express';
/* npm install @types/express - Pacote de Tipagem */
import routes from './routes';

import './database/connection';

const app = express();
app.use(express.json());

app.use(routes);


app.listen(3333);
