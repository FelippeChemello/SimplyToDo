import { ErrorRequestHandler } from 'express'
import { ValidationError } from 'yup'

interface ValidationErrors {
    [key: string]: string[] //Objeto com chaves sendo strings e seus valores sendo um array de strings
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
    console.error(error)

    return response.status(500).json({ message: 'Internal Server Error' })
}

export default errorHandler
