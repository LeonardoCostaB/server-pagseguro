import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import { router } from './router'

class Server {
  private app = express()

  constructor() {
    this.app
    this.middlewares();
    this.routes();
    this.port();
  }

  middlewares() {
    this.app.use(express.json())
    this.app.use(cors())
  }

  routes() {
    this.app.use(router)
  }

  port() {
    this.app.listen(5555, () => console.log("server is running"))
  }
}

export default new Server()