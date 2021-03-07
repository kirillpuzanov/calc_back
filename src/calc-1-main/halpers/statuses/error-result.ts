import {Response} from 'express';

export const errorStatus400 = (res: Response, error: string, statusCodeError: number, input_data?: any) => {
    res.status(statusCodeError).json({
        error: error,
        statusCode: statusCodeError,
        input_data,
    })
}

export const errorStatus500 = (res: Response, error: any, input_data: string) => {
    const errorObj = {
        error: error.message,
        statusCode: 500,
        input_data,

    }
    console.log('Error Server/DB', errorObj)
    res.status(500).json({errorObj})
}