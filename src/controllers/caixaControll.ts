import { Request, Response } from "express";
import {prisma} from '../db'
export class Caixa{


    async createCaixa(req:Request,res:Response) {
        const {name} = await req.body

        const caixa = await prisma.caixa.create({
            data:{
                name:name
            }
        })

        res.json(caixa);
    }

    async caixas(req:Request,res:Response) {
    
        
        const caixa = await prisma.caixa.findMany({
            orderBy:{
                name:'asc'
            }
        })

        res.json(caixa);
    }
    


    async getCaixaId(req:Request,res:Response) {

        

        const month = new Date().getMonth()


        const caixa = await prisma.caixa.findUnique({
            where:{
                name:month,
                
            }
        })

        console.log(caixa)



        return res.json(caixa)
    }


    async getEntradas(req:Request,res:Response) {
        
        const date = new Date()
        const month = date.getMonth()
        const day = date.getMonth()


        

        const entradaDel = await prisma.entrada.deleteMany({
            where:{
                month:month-1
            }
        })



        const entradas = await prisma.entrada.findMany({})

        return res.json(entradas)

    }


    async delEntradas(req:Request,res:Response) {
        
        

        

        const entradaDel = await prisma.entrada.deleteMany()



    

        return res.json(entradaDel)

    }

    





    
    async deleteCaixa(req:Request,res:Response) {

        const {name} = req.body
        
        
        const caixa = await prisma.caixa.deleteMany()

        res.json(caixa);
    }

    
    async zeraCaixa(req:Request,res:Response) {

        
        
        
        const caixa = await prisma.caixa.updateMany({
            data:{
                aplicativo:0,
                pix:0,
                dinheiro:0
            }
        })

        res.json(caixa);
    }


    


    

        

    


}