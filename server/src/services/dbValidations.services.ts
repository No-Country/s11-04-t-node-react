import { Types } from 'mongoose'
import ClientModel from '../models/client.model'
import ServiceModel from '../models/service.model'

export const isClientValid = async (clientId: string) => {
  try {
    const client = await ClientModel.findById(clientId)
    return client !== null
  } catch (error) {
    return false
  }
}

export const calculateServicesTotalPrice = async (servicesIds: string[]) => {
  const servicesIdsAsObjectIds = servicesIds.map((id) => new Types.ObjectId(id))
  try {
    /**
     * Construye un pipeline de agregación de MongoDB para calcular el precio total de un conjunto de servicios.
     * @param servicesIdsAsObjectIds Un arreglo de ObjectIds que representan los servicios a incluir en el cálculo.
     * @returns Un arreglo que representa el pipeline de agregación de MongoDB con el que se calcula el precio total de los servicios.
     */
    const pipeline = [
      {
        $match: {
          _id: { $in: servicesIdsAsObjectIds }
        }
      },
      {
        $group: {
          _id: null,
          totalPrice: {
            $sum: '$price'
          }
        }
      }
    ]

    const result = await ServiceModel.aggregate(pipeline)
    return result[0]?.totalPrice || 0
  } catch (error) {
    return undefined
  }
}
