import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import {prisma} from '../db'
export class User{


    async createUser(req:Request,res:Response){
        const {name,cpf,email,password,tel,emerg} = req.body


        const hashedpassword = bcrypt.hashSync(password,10)


        const user = await prisma.user.create({
            data:{
                name:name,
                cpf:cpf,
                email:email,
                password:hashedpassword,
                tel:tel,
                emerg:emerg
            }
        })

        return res.json({sucess:'true'})
    
    }

    async deleteUser(req:Request,res:Response){
        const {id} = req.params
        const user = await prisma.user.delete({
            where:{
                id: id
            }
        });
        return res.json(user)
        
    }

    async updateUser(req:Request,res:Response){

        const {name,cpf,email,password,tel,emerg} = req.body
        const {id} = req.params
        const hashedpassword = bcrypt.hashSync(password,10)

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
                emerg:emerg
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

        const passCorrect = bcrypt.compareSync(password,user.password!)
        if(passCorrect){
            return res.json(user)
        }
        return res.json({sucess:false})

    }


}