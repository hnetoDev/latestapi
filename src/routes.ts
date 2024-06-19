import { Router } from "express";
import {User} from './controllers/UserControll'
import {Plano} from './controllers/planoControll'
import {Caixa} from './controllers/caixaControll'
import {Exercicio, Treino} from './controllers/treinoControll'


export const routes = Router();

const exercicio = new Exercicio();
const treino = new Treino()
const user = new User()
const plano = new Plano();
const caixa = new Caixa()

routes.get('/api/user/caixas',caixa.caixas);

routes.get('/api/user/planos',plano.getPlanos)

routes.get('/api/user/exercicios',exercicio.getExercicios)
routes.delete('/api/user/delexercicio/:id',exercicio.delExercicio)
routes.post('/api/user/exercicios/create',exercicio.createExercicio)


routes.post('/api/user/treino/create',treino.createTreino)
routes.get('/api/user/treinos',treino.getTreinos)

routes.post('/api/user',user.createUser)

routes.get('/api/user/:search',user.getUser)






routes.get('/api/user/caixa',caixa.getCaixaId)



routes.delete('/api/user/caixa/delEntradas',caixa.delEntradas)

routes.put('/api/user/updatePayment/:id',user.getPaymentTest)





routes.put('/api/user/planos/update/:id',plano.zeraPlano)

routes.get('/api/user/:id',user.getById)
routes.delete('/api/user/caixa/delete',caixa.deleteCaixa)



routes.put('/api/user/caixa/zeraEntrada',caixa.zeraCaixa)

routes.get('/api/user/caixa/entradas',caixa.getEntradas)

routes.post('/api/user/auth',user.authUser)
routes.put('/api/user/update/:id',user.updateUser)


routes.delete('/api/user/delete/:id',user.deleteUser)
routes.post('/api/user/planos/create',plano.createPlanos);
routes.delete('/api/user/planos/delete/:id',plano.deletePlanos);
routes.post('/api/user/caixa/create',caixa.createCaixa);



