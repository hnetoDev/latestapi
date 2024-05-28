import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import {prisma} from '../db'
export class User{


    async createUser(req:Request,res:Response){
        const {name,cpf,email,password,tel,emerg,planoId} = await req.body
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password,salt)
        console.log(hashedpassword);

        const qtdPrev = await prisma.plano.findUnique({
            where:{
                id:planoId
            }
        })
        const qtd = qtdPrev?.qtd;
        const plano = await prisma.plano.update({
            where:{
                id:planoId
            },
            data:{
                qtd:qtd! + 1
            }
        })

        console.log(plano.qtd)

        


        const user = await prisma.user.create({
            data:{
                name:name,
                cpf:cpf,
                email:email,
                password:hashedpassword,
                tel:tel,
                emerg:emerg,
                planoId:planoId
            }
        })

        return res.json(user)

    }

    async deleteUser(req:Request,res:Response){
        
        const {id} = req.params
        

        console.log(id)

        const userPrev = await prisma.user.findUnique({
            where:{
                id:id
            }
        })
        const planoId = userPrev?.planoId 
        if(planoId){
            
        const qtdPrev = await prisma.plano.findUnique({
            where:{
                id:planoId
            }
        })
        const qtd = qtdPrev?.qtd;
        const plano = await prisma.plano.update({
            where:{
                id:planoId
            },
            data:{
                qtd:qtd! - 1
            }
        })
        }

        const user = await prisma.user.delete({
            where:{
                id: id
            }
        });
        return res.json(user)
        
    }

    async updateUser(req:Request,res:Response){

        const {name,cpf,email,password,tel,emerg,planoId} = await req.body
        const {id} = req.params
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password,salt)

        const userPrev = await prisma.user.findUnique({
            where:{
                id:id
            }
        })

        
        if(planoId !== userPrev?.planoId){
            const planop = await prisma.plano.findUnique({
                where:{
                    id:planoId
                }
            })
            const qtd = planop?.qtd;
            const plano = await prisma.plano.update({
                where:{
                    id:planoId
                },
                data:{
                    qtd:qtd! + 1
                }
            })
            const planoPass = userPrev!.planoId as string

            const planoPassB = await prisma.plano.findUnique({
                where:{
                    id:planoPass
                }
            })

            const qtdB = planoPassB?.qtd

            const planoSub = await prisma.plano.update({
                where:{
                    id:planoPass
                },
                data:{
                    qtd:qtdB! - 1
                }
            })
        }

        const user = await prisma.user.update({
            where:{
                id:id
            },
            data:{
                name:name,
                cpf:cpf,
                email:email,
                password:hashedpassword,
                tel:tel,
                emerg:emerg,
                planoId:planoId
            }
            
        });
        return res.json(user)
        
    }
    async getPayment(req:Request,res:Response){

        const {active} = req.body
        const {id} = req.params
       

        
        const user = await prisma.user.update({
            where:{
                id:id
            },
            data:{
                active:active
            }
            
        });
        return res.json(user)
        
    }
    
    


    async getById(req:Request,res:Response){
        const {id} = req.params

        const user = await prisma.user.findMany({
            where:{
                id:id
            }
        })

        return res.json(user[0])
    }


    async getUser(req:Request,res:Response){
        const users = await prisma.user.findMany();

        return res.json(users)
    }

    

    async authUser(req:Request,res:Response){
        const {email,password} = req.body

        const resp = await prisma.user.findMany({
            where:{
                email:email
            }
        })

        const user = resp[0]

        const passCorrect = await bcrypt.compare(password,user.password!)
        if(passCorrect){
            return res.json(user)
        }
        return res.json({sucess:false})

    }


}