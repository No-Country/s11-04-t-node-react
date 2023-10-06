import { type Response } from 'express'
import { HttpStatusCode } from '../constants/http'
const { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, UNAUTHORIZED, NOT_FOUND } =
  HttpStatusCode

const responseWithData = (res: Response, statusCode: number, data: any) =>
  res.status(statusCode).json(data)

export const error = (res: Response) =>
  responseWithData(res, INTERNAL_SERVER_ERROR, {
    status: INTERNAL_SERVER_ERROR,
    message: 'Oops! Something wrong'
  })

export const badRequest = (res: Response, message: string) =>
  responseWithData(res, BAD_REQUEST, {
    status: BAD_REQUEST,
    message
  })

export const ok = (res: Response, data: any) =>
  responseWithData(res, CREATED, data)

export const created = (res: Response, data: any) =>
  responseWithData(res, CREATED, data)

export const unauthorize = (res: Response) =>
  responseWithData(res, UNAUTHORIZED, {
    status: UNAUTHORIZED,
    message: 'Unauthorized'
  })

export const notfound = (res: Response) =>
  responseWithData(res, NOT_FOUND, {
    status: NOT_FOUND,
    message: 'Resource not found'
  })
