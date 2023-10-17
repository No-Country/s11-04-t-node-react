import { Router } from 'express'
import { extractToken } from '../middlewares/extractToken.middleware'
import { auth } from '../middlewares/auth.middleware'
import {
  deleteClient,
  getClients,
  modifyClient
} from '../controllers/client.controller'

export const clientRouter = Router()

clientRouter.put('/modify/:id', extractToken, auth, modifyClient)
clientRouter.delete('/delete/:id', extractToken, auth, deleteClient)
clientRouter.get('/get-all', extractToken, auth, getClients)
