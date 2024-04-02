import  express  from "express"
import helmet from "helmet"
import { routes } from "./routes"
const app = express()




app.use(helmet())
app.use(express.json())
app.use(routes)







app.listen(3000,()=>{
    console.log('Executando')
})

export default app