import {Response} from 'express';

export const errorStatus400 = (res: Response, error: string, statusCodeError: number, input_data?: any) => {
    res.status(statusCodeError).json({
        error: error,
        statusCode: statusCodeError,
        input_data: input_data
    })
}

export const errorStatus500 = (res: Response, error: any, inPlace: string) => {
    const errorObj = {
        error: 'some error: ' + error.message,
        statusCode: 500,
        inPlace: inPlace
    }
    console.log('Error Server/DB', errorObj)
    res.status(500).json({errorObj})
}