import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import { router } from './router'

const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

app.listen(5555, () => console.log('Server is running'))