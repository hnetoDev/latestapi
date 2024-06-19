import  express  from "express"
import helmet from "helmet"
import { routes } from "./routes"
import cors from 'cors'
import { middleware } from "./middleware"
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { prisma } from "./db"
const app = express()



app.use(cors({
    origin:"http://localhost:3000"
}))

app.use(helmet())
app.disable('etag');


app.use(express.json())


app.use(express.urlencoded({extended:true}))


app.use(middleware)


app.use(routes)



setInterval(()=>{
    const hour = new Date().getHours()
    console.log(hour)
if(hour === 18 ){
    console.log('sao 7 horas')
    const atualizaUser = async()=>{
        const users = await prisma.user.findMany();

        const date = new Date()
        const month = date.getMonth()
        const day = date.getDate()
        const year =  date.getFullYear()

        

        users.map( async(u) =>{

            if(u.active === true){
                const entrada = await prisma.entrada.findUnique({
                    where:{
                        id:u.entradaId!
                    }
                })
                let entradaMonth = entrada!.date.slice(5,7);
                console.log(Number(entradaMonth),'mes do ultimo pagamento')
                if(Number(entradaMonth) !== month+1){
                    const yearM = u.mensalidade?.slice(0,4)
                    const monthM = u.mensalidade?.slice(5,7)
                    const dayM = u.mensalidade?.slice(8,10)
                    console.log(day,dayM)
        
        
        
                    // console.log(u.mensalidade,`${date.getFullYear()}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`);
        
                    if(dayM === `${day < 10 ? `0${day}` : day}` && ((monthM !== `${month < 10 ? `0${month}` : month}` && yearM === `${year}`)||monthM === `${month < 10 ? `0${month}` : month}` && yearM !== `${year}`)){
                        console.log('mensalidade atrasada')
                    const userUp = await prisma.user.update({
                        where:{
                            id:u.id
                        },
                        data:{
                            active:false
                        }
                    })
                  }
                    }
                }});
                
                }



    

    atualizaUser();
}


},100000)









app.listen(8000,()=>{
    console.log('Executando')
   
})

export default app