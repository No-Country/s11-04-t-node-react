import { ERROR_MSGS } from '../constants/errorMsgs'
import { HttpStatusCode } from '../constants/http'
import { SUCCESS_MSGS } from '../constants/successMsgs'
import ClientModel from '../models/client.model'
import type { Client } from '../types/client.type'

export const modifyClientService = async (id: string, body: Client) => {
  try {
    const client = ClientModel.findById(id)
    if (!client) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.CLIENTID_INVALID
      }
    }

    await ClientModel.findByIdAndUpdate({ _id: id }, body, {
      new: true,
      runValidators: true
    })

    return {
      succes: true,
      statusCode: HttpStatusCode.OK,
      msg: SUCCESS_MSGS.MODIFIED_CLIENT_SUCCESS
    }
  } catch (error) {
    console.log(error)

    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: ERROR_MSGS.SERVER_ERROR
    }
  }
}

export const deleteClientService = async (id: string) => {
  try {
    const client = await ClientModel.findById(id)
    if (!client) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: ERROR_MSGS.CLIENTID_INVALID
      }
    }

    await client.deleteOne()
    return {
      success: true,
      statusCode: HttpStatusCode.OK,
      msg: SUCCESS_MSGS.DELETED_CLIENT_SUCCESS
    }
  } catch (error) {
    console.log(error)

    return {
      success: false,
      statusCode: HttpStatusCode.BAD_REQUEST,
      msg: ERROR_MSGS.SERVER_ERROR
    }
  }
}
