import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import {prisma} from '../db'

import { Caixa } from "./caixaControll";

const caixa = new Caixa()
export class User{


    async createUser(req:Request,res:Response){
        const {name,cpf,email,password,tel,emerg,planoId,mensalidade,genero} = await req.body
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
                planoId:planoId,
                mensalidade:mensalidade,
                genero:genero
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
        const {search} = req.params
        console.log(search)
        const splitado = search.split(' ')
        console.log(splitado)
        if(splitado[0] === 'false' && splitado[1] === 'false'){
            console.log('oi')
            const users = await prisma.user.findMany({
                orderBy:{
                    mensalidade:'desc'
                }
            })
            return res.json(users)
        }

        if(splitado[1] !== 'false' && splitado[0] !== 'false'){
            const users = await prisma.user.findMany({
                where:{
                    name:{
                        contains:splitado[0],
                        mode:'insensitive'
                    },
                    active:splitado[1] === 'active' ? true : false
                },
                orderBy:{
                    mensalidade:'desc'
                }
            })
            return res.json(users)

        }

        if(splitado[0] === 'false' && splitado[1] !== 'false'){
            const users = await prisma.user.findMany({
                where:{
                    active:splitado[1] === 'active' ? true : false
                },
                
            })
            console.log(users)
            return res.json(users)
        }

        const users = await prisma.user.findMany({
            where:{
                name:{
                    contains:splitado[0],
                    mode:'insensitive'

                }
            },
            orderBy:{
                mensalidade:'desc'
            }
        })
        
        console.log(users)
        
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





    async getPaymentTest(req:Request,res:Response){
        console.log('aq')

        const {active,method,date} = req.body
        const {id} = req.params

        let result;

        if(active){

        const userPrev = await prisma.user.findUnique({
            where:{
                id:id
            }
        })
        const planoId = userPrev?.planoId as string

        const plano = await prisma.plano.findUnique({
            where:{
                id:planoId
            }
        })

        const value = Number(plano?.value)


        const data = new Date();
        const month = data.getMonth()
        const day = data.getDate()
        const year = data.getFullYear()

        

        
        let sucess:boolean;
        


        const caixa = await prisma.caixa.findUnique({
            where:{
                name:month
            }
        })
        const entrada = await prisma.entrada.create({
            data:{
                name:userPrev!.name,
                method:method,
                date: date,
            }
        })
        const user = await prisma.user.update({
            where:{
                id:id
            },
            data:{
                entradaId:entrada.id
            }
        })
        if(method === 'pix'){
          

            const valuePrev = caixa?.pix ? caixa?.pix : 0

            result = await prisma.caixa.update({
                where:{
                    name:(month)
                },
                data:{
                    pix: valuePrev + (value ? value : 0)
                }
            })

            

        } else if(method === 'dinheiro'){
          

            const valuePrev = caixa?.dinheiro ? caixa?.dinheiro : 0

        
            result = await prisma.caixa.update({
                where:{
                    name:(month)
                },
                data:{
                    dinheiro: valuePrev + (value ? value : 0)
                }
            })

           


        } else if(method === 'aplicativo'){
          

            const valuePrev = caixa?.aplicativo ? caixa?.aplicativo : 0

            result = await prisma.caixa.update({
                where:{
                    name:(month)
                },
                data:{
                    pix: valuePrev + (value ? value : 0)
                }
            })
           

          
        }

        }
        

        
    




       
        /* const results = months.map(async(m) =>{    
            console.log(month,count)

            if(month === count){
                console.log('achei')
                const caixa = await prisma.caixa.findUnique({
                    where:{
                        name:(count)
                    }
                })
                const entrada = await prisma.entrada.create({
                    data:{
                        name:userPrev!.name,
                        method:method,
                        date: `${day}/${month}/${year}`,
                        month: count
                    }
                })
                if(method === 'pix'){
                  

                    const valuePrev = caixa?.pix ? caixa?.pix : 0

                    const result = await prisma.caixa.update({
                        where:{
                            name:(count)
                        },
                        data:{
                            pix: valuePrev + (value ? value : 0)
                        }
                    })

                    

                     
                     return result

                } else if(method === 'dinheiro'){
                  

                    const valuePrev = caixa?.dinheiro ? caixa?.dinheiro : 0

                
                    const result = await prisma.caixa.update({
                        where:{
                            name:(count)
                        },
                        data:{
                            dinheiro: valuePrev + (value ? value : 0)
                        }
                    })

                   

                    return result

                } else if(method === 'aplicativo'){
                  

                    const valuePrev = caixa?.aplicativo ? caixa?.aplicativo : 0

                    const result = await prisma.caixa.update({
                        where:{
                            name:(count)
                        },
                        data:{
                            pix: valuePrev + (value ? value : 0)
                        }
                    })
                   

                    return result
                }

                count++

                
            }

            count++
            return

        })
        */


        res.json(result)

        const user = await prisma.user.update({
            where:{
                id:id
            },
            data:{
                active:active
            }
        })

    
    }








}