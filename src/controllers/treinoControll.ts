import { Request, Response } from "express";
import {prisma} from '../db'

export class Exercicio{
    async createExercicio(req:Request,res:Response){
        const {name,desc} = await req.body

        const exercicio = await prisma.exercicio.create({
            data:{
                name:name,
                desc:desc,

            }
        })

        res.json(exercicio)
    }
    async getExercicios(req:Request,res:Response){
       

        const exercicio = await prisma.exercicio.findMany({
           
        })

        res.json(exercicio)
    }


    async delExercicio(req:Request,res:Response){
       
        const {id} = req.params
        const exercicio = await prisma.exercicio.delete({
           where:{
            id:id
           }
        })

        res.json(exercicio)
    }
}

export class Treino{
    

    async createTreino(req:Request,res:Response){
        const {name,exercicios} = await req.body

        const treino = await prisma.treino.create({
            data:{
                name:name,
                exercicio:exercicios
            }
        })
        res.json(treino)

    }

    async getTreinos(req:Request,res:Response){

        const treinos = await prisma.treino.findMany({})
        res.json(treinos)
    }


}


