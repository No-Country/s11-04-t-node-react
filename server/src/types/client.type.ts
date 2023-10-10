/* MODELS TYPES */
export interface Client {
  fullName: string
  phone: string
  email: string
  role: string
}

/* USER RESPONSE TYPE */

export type ClientRequest = Omit<Client, 'userId'>
