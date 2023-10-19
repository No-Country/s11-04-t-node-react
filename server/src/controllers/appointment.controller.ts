import { type Request, type Response } from 'express'
import { deleteAppoimentService } from '../services/appoiment.service'
export const deleteAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.body
  await deleteAppoimentService(id)
}
