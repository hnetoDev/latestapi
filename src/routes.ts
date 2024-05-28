import { Router } from "express";
import {User} from './controllers/UserControll'
import {Plano} from './controllers/planoControll'
export const routes = Router();


const user = new User()
const plano = new Plano();

routes.post('/api/user',user.createUser)
routes.get('/api/user',user.getUser)
routes.get('/api/user/planos',plano.getPlanos)
routes.get('/api/user/:id',user.getById)
routes.post('/api/user/auth',user.authUser)
routes.put('/api/user/update/:id',user.updateUser)
routes.put('/api/user/updatePayment/:id',user.getPayment)
routes.delete('/api/user/delete/:id',user.deleteUser)
routes.post('/api/user/planos/create',plano.createPlanos);
routes.delete('/api/user/planos/delete/:id',plano.deletePlanos);
