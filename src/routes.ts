import { Router } from "express";
import {User} from './controllers/UserControll'
export const routes = Router();


const user = new User()


routes.post('/api/user',user.createUser)
routes.get('/api/user',user.getUser)
routes.get('/api/user/:id',user.getById)
routes.post('/api/user/auth',user.authUser)
routes.put('/api/user/update/:id',user.updateUser)
routes.delete('/api/user/delete/:id',user.deleteUser)

