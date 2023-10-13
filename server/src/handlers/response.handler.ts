import { type Response } from 'express'
import { HttpStatusCode } from '../constants/http'
import { ERROR_MSGS } from '../constants/errorMsgs'

const responseWithData = (res: Response, statusCode: number, data: any) =>
  res.status(statusCode).json(data)

export const internalServerError = (res: Response) =>
  responseWithData(res, HttpStatusCode.INTERNAL_SERVER_ERROR, {
    succes: false,
    msg: ERROR_MSGS.SERVER_ERROR
  })

export const badRequest = (res: Response, message: any) =>
  responseWithData(res, HttpStatusCode.BAD_REQUEST, {
    succes: false,
    msg: message
  })

export const ok = (res: Response, data: any) =>
  responseWithData(res, HttpStatusCode.OK, data)

export const created = (res: Response, data: any) =>
  responseWithData(res, HttpStatusCode.CREATED, data)

export const unauthorized = (res: Response) =>
  responseWithData(res, HttpStatusCode.UNAUTHORIZED, {
    succes: false,
    msg: ERROR_MSGS.UNAUTHORIZED
  })

export const notFound = (res: Response) =>
  responseWithData(res, HttpStatusCode.NOT_FOUND, {
    succes: false,
    msg: ERROR_MSGS.VERIFY_OTP_USER_NOT_FOUND
  })
