import { type Request, type Response } from 'express'
import {
  createBarberService,
  deleteBarberService,
  getBarberByIdService,
  getBarberClientsService,
  getBarberInSessionService,
  getBarbersService,
  getBarbersWithTheirServicesService,
  loginService,
  modifyBarberService,
  modifyBerberInSessionService
} from '../services/barber.service'
import { verifyEmailService } from '../services/verifyEmail.service'

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body

  const { success, statusCode, token, msg, barberId } =
    await loginService(email)

  res.status(statusCode).json({
    success,
    msg,
    token,
    barberId
  })
}

export const verifyEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const tokenOTP = req.token
  const { body } = req
  const { success, statusCode, msg, token, fullName, role, tokenExpired, _id } =
    await verifyEmailService(body, tokenOTP)

  res.status(statusCode).json({
    success,
    msg,
    token,
    fullName,
    role,
    tokenExpired,
    _id
  })
}

export const createBarber = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { body } = req
  const { success, msg, statusCode, barber } = await createBarberService(body)

  res.status(statusCode).json({
    success,
    msg,
    barber
  })
}

export const getBarbers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const { success, msg, statusCode, barbers } = await getBarbersService()
  res.status(statusCode).json({
    success,
    msg,
    barbers
  })
}

export const deleteBarber = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const { success, statusCode, msg } = await deleteBarberService(id)
  res.status(statusCode).json({
    success,
    msg
  })
}

export const getBarberById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const { success, statusCode, msg, barber } = await getBarberByIdService(id)

  res.status(statusCode).json({
    success,
    msg,
    barber
  })
}

export const modifyBarber = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const { body } = req

  const { success, statusCode, msg } = await modifyBarberService(id, body)

  res.status(statusCode).json({
    success,
    msg
  })
}

export const getBarbersWithTheirServices = async (
  _: Request,
  res: Response
): Promise<void> => {
  const { success, statusCode, msg, barbers } =
    await getBarbersWithTheirServicesService()

  res.status(statusCode).json({
    success,
    msg,
    barbers
  })
}

export const modifyBerberInSession = async (req: Request, res: Response) => {
  const { id } = req.params
  const { userInSessionId, body } = req

  const { msg, statusCode, success } = await modifyBerberInSessionService(
    id,
    body,
    userInSessionId
  )

  res.status(statusCode).json({
    success,
    msg
  })
}

export const getBarberInSession = async (req: Request, res: Response) => {
  const { id } = req.params
  const { userInSessionId } = req

  const { msg, statusCode, success, barber } = await getBarberInSessionService(
    id,
    userInSessionId
  )

  res.status(statusCode).json({
    success,
    msg,
    barber
  })
}

export const getBarberClients = async (req: Request, res: Response) => {
  const { id } = req.params
  const { msg, statusCode, success, clients } =
    await getBarberClientsService(id)

  res.status(statusCode).json({
    success,
    msg,
    clients
  })
}
