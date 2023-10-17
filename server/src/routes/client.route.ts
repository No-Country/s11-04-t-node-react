import { Router } from 'express'
import { extractToken } from '../middlewares/extractToken.middleware'
import { auth } from '../middlewares/auth.middleware'
import { modifyClient } from '../controllers/client.controller'

export const clientRouter = Router()

clientRouter.put('/modify/:id', extractToken, auth, modifyClient)
