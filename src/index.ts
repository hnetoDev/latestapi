import  express  from "express"
import helmet from "helmet"
import { routes } from "./routes"
import cors from 'cors'
import { middleware } from "./middleware"
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
const app = express()



app.use(cors({
    origin:"http://localhost:3000"
}))

app.use(helmet())


app.use(express.json())


app.use(express.urlencoded({extended:true}))


app.use(middleware)


app.use(routes)








app.listen(8000,()=>{
    console.log('Executando')
   
})

export default app