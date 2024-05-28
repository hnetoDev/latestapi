import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import {prisma} from '../db'

export class Plano{


    async getPlanos(req:Request,res:Response){
        const users = await prisma.plano.findMany();

        return res.json(users)
    }


    async createPlanos(req:Request,res:Response){
        const {name,value,duration} = await req.body;
        console.log(name,value,duration)
        const plano = await prisma.plano.create({
            data:{
                name:name,
                value:value,
                duration:duration,
                qtd:0
            }
        })

        return res.json(plano)
        
    }

    async deletePlanos(req:Request,res:Response){
        const {id} = req.params;

        const plano = await prisma.plano.delete({
            where:{
                id:id
            }
        })


    }
}