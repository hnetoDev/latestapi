import  express  from "express"
import helmet from "helmet"
import { routes } from "./routes"
import cors from 'cors'
import { middleware } from "./middleware"
const app = express()




app.use(helmet())
app.use(middleware)
app.use(cors({
    origin:"http://localhost:3000"
}))
app.use(express.json())
app.use(routes)







app.listen(8000,()=>{
    console.log('Executando')
})

export default app