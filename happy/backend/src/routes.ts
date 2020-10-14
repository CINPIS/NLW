import OrphanagesController from './controllers/OrphanagesController';

import { Router } from 'express';
const routes = Router();

routes.post('/orphanages', OrphanagesController.create);
routes.get('/orphanages', OrphanagesController.index);
// (index, show, create, update, delete)
routes.get('/orphanages/:id', OrphanagesController.show);


export default routes;